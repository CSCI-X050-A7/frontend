// from https://github.com/sanjay-arya/react-auth-demo
// we use HttpOnly cookies from backend, not localStorage for security

import { useRequest } from "ahooks";
import { HttpResponse, SchemaUser } from "client";
import React, { createContext, useContext, useMemo, useState } from "react";
import Backend from "utils/service";

export interface AuthContextValue {
  user: SchemaUser | undefined
  loading: boolean
  refresh: () => void
  refreshAsync?: () => Promise<HttpResponse<SchemaUser>>
}
const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  loading: false,
  refresh: () => {}
});

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<SchemaUser>()
  const { loading, refresh, refreshAsync } = useRequest(
    async () => Backend.user.v1UsersMeList(),
    {
      onSuccess: res => {
        console.log('res', res)
        console.log('res.data', res.data)
        if (res.data) {
          setUser(res.data)
          console.log('user', user)
        } else {
          setUser(undefined)
          console.log('no!')
        }
      },
      onError: () => {
        setUser(undefined)
      }
    }
  )

  // Memoized value of the authentication context
  const value: AuthContextValue = useMemo(
    () => ({
      user, loading, refresh, refreshAsync
    }),
    [user, loading, refresh, refreshAsync]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={value} > {children} </AuthContext.Provider>
  );

};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
