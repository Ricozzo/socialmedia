import React, { useState, useEffect, createContext, ReactNode } from "react";
import authService from "../Services/auth.services";
import { IUser, AuthContextType } from "../types";

const initialContextValue: AuthContextType = {
  isLoggedIn: false,
  isLoading: false,
  user: null,
  storeToken: () => {},
  authenticateUser: () => {},
  logoutUser: () => {},
  getToken: () => null,
};

const AuthContext = createContext<AuthContextType>(initialContextValue);

interface AuthProviderWrapperProps {
  children: ReactNode;
}

// Componente Provider com Tipagem
function AuthProviderWrapper({ children }: AuthProviderWrapperProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<IUser | null>(null);

  const storeToken = (token: string): void => {
    localStorage.setItem("authToken", token);
  };

  const removeToken = (): void => {
    localStorage.removeItem("authToken");
  };

  const logoutUser = (): void => {
    removeToken();
    authenticateUser();
  };

  const getToken = (): string | null => {
    console.log(localStorage.getItem("authToken"));
    return localStorage.getItem("authToken");
  };

  const authenticateUser = (): void => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const rawData = response.data;

          const userFromAPI: IUser = {
            ...rawData,
            id: rawData.id,
          } as IUser;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(userFromAPI);
        })
        .catch(() => {
          removeToken();
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  // ..

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logoutUser,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProviderWrapper };
