// from https://github.com/sanjay-arya/react-auth-demo
// we use HttpOnly cookies from backend, not localStorage for security
import { useRequest } from 'ahooks'
import type { HttpResponse, SchemaUserDetail } from 'client'
import type React from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import Backend from 'utils/service'

export interface AuthContextValue {
  user: SchemaUserDetail | undefined
  loading: boolean
  refresh: () => void
  refreshAsync?: () => Promise<HttpResponse<SchemaUserDetail>>
}
const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  loading: false,
  refresh: () => {}
})

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<SchemaUserDetail>()
  const { loading, refresh, refreshAsync } = useRequest(
    async () => Backend.user.v1UsersMeList(),
    {
      onSuccess: res => {
        setUser(res.data)
      },
      onError: () => {
        setUser(undefined)
      }
    }
  )

  // Memoized value of the authentication context
  const value: AuthContextValue = useMemo(
    () => ({
      user,
      loading,
      refresh,
      refreshAsync
    }),
    [user, loading, refresh, refreshAsync]
  )

  // Provide the authentication context to the children components
  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
