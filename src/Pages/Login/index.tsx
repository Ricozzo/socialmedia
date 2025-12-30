import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/auth.context";
import authService from "../../Services/auth.services";
import { ILoginPayload } from "../../types";
import logoKaaxDool from "../../assets/logoKaax.png";

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
    <div className="flex min-h-screen w-full items-center bg-[#fdfcf8]">
      {/* Lado Esquerdo: Carrossel */}
      <div className="hidden lg:flex lg:w-1/2 h-screen bg-[#8d984c]/5 items-center justify-center">
        <div className="text-[#8d984c]/40 font-serif italic text-2xl">
          [Aqui vou colocar um carrossel ainda]
        </div>
      </div>
      {/* Lado Direito: Box de Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 lg:p-20">
        <div className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(141,152,76,0.15)] border border-[#8d984c]/10">
          <div className="mb-14 text-center">
            <div className="flex justify-center -mt-20 -mb-16 overflow-hidden">
              <img
                src={logoKaaxDool}
                className="h-64 w-auto object-contain"
                alt="Logo Kaax Dool"
              />
            </div>
            <h1 className="text-4xl font-serif font-bold text-[#6c562c] tracking-tight">
              Kaax
            </h1>
            <p className="text-[#8d984c] font-medium mt-2">
              Sua jornada sustentável começa aqui
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-2 ml-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-[#6c562c] placeholder:text-gray-300 focus:ring-2 focus:ring-[#8d984c] focus:bg-white outline-none transition-all shadow-sm"
                placeholder="email@exemplo.com"
                value={formState.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-2 ml-1">
                Senha
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 text-[#6c562c] placeholder:text-gray-300 focus:ring-2 focus:ring-[#8d984c] focus:bg-white outline-none transition-all shadow-sm"
                placeholder="••••••••"
                value={formState.password}
                onChange={handleChange}
              />
            </div>

            <button
              className="w-full bg-[#8d984c] hover:bg-[#6c562c] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#8d984c]/20 mt-4 uppercase tracking-widest text-sm"
              type="submit"
            >
              Entrar
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm font-medium">
              Não tem uma conta?{" "}
              <Link
                to={"/signup"}
                className="text-[#b59659] font-bold hover:text-[#bfa064] transition-colors underline underline-offset-8"
              >
                Crie uma agora
              </Link>
            </p>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400">
                Preservando o Amanhã
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogInPage;
