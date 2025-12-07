import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import authService from "../../Services/auth.services";
import { ILoginPayload } from "../../types";

function LogInPage(): JSX.Element {
  const [formState, setFormState] = useState<ILoginPayload>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    authService
      .login(formState)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate(`/`);
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data.message || "Ocorreu um erro desconhecido.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <h1>Iniciar Sessão</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        <br />

        <label>Senha:</label>
        <br />
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Login</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Ainda não tem uma conta??</p>
      <Link to={"/signup"}>Se inscreva aqui!</Link>
    </div>
  );
}

export default LogInPage;
