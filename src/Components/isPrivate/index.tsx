import React, { useContext, ReactNode } from 'react';
import { AuthContext } from "../../Context/auth.context";
import { Navigate } from "react-router-dom";

interface IsPrivateProps {
  children: ReactNode;
}

function IsPrivate({ children }: IsPrivateProps) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Carregando ... </p>;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return children;
}

export default IsPrivate;
