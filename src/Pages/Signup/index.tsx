import React, { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/auth.services";
import { ISignupPayload } from "../../types";
import logoKaaxDool from "../../assets/logoKaax.png";

function SignUpPage(): JSX.Element {
  const [form, setForm] = useState<ISignupPayload>({
    email: "",
    username: "",
    password: "",
    first_name: "",
    lastName: "",
    birthDate: "",
    phone: "",
    profilePictureUrl: "",
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const regex = /^[a-z0-9_]+$/;
    if (
      !regex.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Tab"
    ) {
      event.preventDefault();
    }
  };

  const navigate = useNavigate();

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const uploadData = new FormData();

    Object.keys(form).forEach((key) => {
      const val = form[key as keyof ISignupPayload];
      if (key !== "profilePictureUrl" || val) {
        uploadData.append(key, val as string | Blob);
      }
    });

    if (fileToUpload) {
      uploadData.append("profilePicture", fileToUpload);
    }

    authService
      .signup(uploadData as unknown as ISignupPayload)
      .then(() => {
        navigate("/login");
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
    <div className="flex min-h-screen w-full items-center bg-[#fdfcf8]">
      <div className="flex w-full items-center justify-center p-4 lg:p-10">
        <div className="w-full max-w-xl bg-white pt-2 pb-10 px-8 lg:px-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(141,152,76,0.15)] border border-[#8d984c]/10">
          <div className="text-center">
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
            <p className="text-[#8d984c] font-medium mt-1 mb-8">
              Crie sua conta e preserve o amanhã
            </p>
          </div>
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Nome
                </label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Primeiro Nome"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={form.first_name}
                  onChange={handleForm}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Apelido
                </label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Segundo Nome"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={form.lastName}
                  onChange={handleForm}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                Nome de usuário
              </label>
              <div className="flex items-center w-full rounded-xl bg-gray-50 border border-gray-100 focus-within:border-[#8d984c] focus-within:ring-1 focus-within:ring-[#8d984c] transition-all overflow-hidden">
                <div className="pl-4 pr-1 flex items-center justify-center">
                  <span className="text-[#8d984c] font-bold text-lg select-none">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  onKeyDown={handleKeyPress}
                  name="username"
                  placeholder="exemplo"
                  className="w-full py-3 pr-4 bg-transparent text-[#6c562c] outline-none placeholder:text-gray-400"
                  value={form.username}
                  onChange={handleForm}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={handleForm}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={form.password}
                  onChange={handleForm}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="birthDate"
                  className={`w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:ring-2 focus:ring-[#8d984c] outline-none ${
                    form.birthDate ? "text-[#6c562c]" : "text-gray-400"
                  }`}
                  value={form.birthDate}
                  onChange={handleForm}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                Telefone
              </label>
              <input
                type="text"
                name="phone"
                placeholder="Telefone"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                value={form.phone}
                onChange={handleForm}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                Imagem de Perfil
              </label>
              <input
                type="file"
                name="profilePicture"
                className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#8d984c]/10 file:text-[#8d984c] hover:file:bg-[#8d984c]/20"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            <button
              className="w-full bg-[#8d984c] hover:bg-[#6c562c] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#8d984c]/20 mt-4 uppercase tracking-widest text-sm"
              type="submit"
            >
              Inscrever
            </button>
          </form>

          {errorMessage && (
            <p className="mt-4 text-red-500 text-center text-sm font-bold">
              {errorMessage}
            </p>
          )}
          <div className="mt-8 text-center border-t border-gray-100 pt-6">
            <p className="text-gray-500 text-sm mb-2">Já possui uma conta?</p>
            <Link
              to={"/login"}
              className="text-[#b59659] font-bold hover:text-[#bfa064] transition-colors underline underline-offset-8"
            >
              Iniciar sessão
            </Link>
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 mt-8">
              Preservando o Amanhã
            </p>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default SignUpPage;
