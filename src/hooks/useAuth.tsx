// from https://github.com/sanjay-arya/react-auth-demo
// we use HttpOnly cookies from backend, not localStorage for security

import { useRequest } from "ahooks";
import { SchemaUser } from "client";
import React, { createContext, useContext, useMemo, useState } from "react";
import Backend from "utils/service";

export interface AuthContextValue {
  user: SchemaUser | undefined
  loading: boolean
}
const AuthContext = createContext<AuthContextValue>({
  user: undefined,
  loading: false,
});

const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<SchemaUser>()
  const { loading } = useRequest(
    async () => Backend.user.v1UsersMeList(),
    {
      onSuccess: res => {
        if (res.data) {
          setUser(res.data)
        } else {
          setUser(undefined)
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
      user, loading
    }),
    [user, loading]
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
