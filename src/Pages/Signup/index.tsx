import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/auth.services";
import { ISignupPayload } from "../../types";

function SignUpPage(): JSX.Element {
  const [form, setForm] = useState<ISignupPayload>({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    birthYear: 2007,
    phone: "",
    profilePictureUrl: "",
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "birthYear" ? Number(value) : value,
    }));
  };

  const handleSignupSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const uploadData = new FormData();

    Object.keys(form).forEach((key) => {
      if (key !== "profilePictureUrl" || form[key as keyof ISignupPayload]) {
        uploadData.append(
          key,
          form[key as keyof ISignupPayload] as string | Blob
        );
      }
    });

    if (fileToUpload) {
      uploadData.append("profilePicture", fileToUpload);
    }

    authService
      .signup(uploadData as unknown as ISignupPayload)
      .then((response) => {
        navigate("/auth/login");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data.message || "Ocorreu um erro desconhecido.";
        setErrorMessage(errorDescription);
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
    } else {
      setFileToUpload(null);
    }
  };

  return (
    <div className="signup-page">
      <h1>Se inscrever</h1>

      <form onSubmit={handleSignupSubmit}>
        <div>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Senha:</label>
          <br />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Username:</label>
          <br />
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Nome:</label>
          <br />
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Apelido:</label>
          <br />
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Ano de Nascimento:</label>
          <br />
          <input
            type="number"
            name="birthYear"
            value={form.birthYear}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Telefone:</label>
          <br />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Imagem de Perfil:</label>
          <br />
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <button type="submit">Inscrever</button>
        </div>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Já possui uma conta??</p>
      <div className="buttonLogin">
        <Link to={"/login"}> Iniciar sessão</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
