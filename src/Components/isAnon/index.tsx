import React, { useContext, ReactNode } from "react";
import { AuthContext } from "../../Context/auth.context";
import { Navigate } from "react-router-dom";

interface IsAnonProps {
  children: ReactNode;
}

function IsAnon({ children }: IsAnonProps) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Carregando ...</p>;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  
  return children;
}

export default IsAnon;