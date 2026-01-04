import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IProfileResponse } from "../../types.ts";
import profileService from "../../Services/profile.services";
import { Header } from "../../Components/Header/index.tsx";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function EditProfilePage() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const { username } = useParams();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<IProfileResponse>(`${API_URL}/api/profile/${username}`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [username]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (profile) {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!profile) return;
    profileService
      .updateProfile(username as string, profile)
      .then((response) => {
        navigate(`/profile/${username}`);
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data.message ||
          "Ocorreu um erro ao atualizar o perfil.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="min-h-screen bg-[#fdfcf8] flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <div className="w-full max-w-md md:max-w-2xl md:bg-white md:p-8 md:rounded-2xl md:shadow-sm md:border md:border-gray-100">
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h3 className="text-4xl font-serif font-bold text-[#6c562c] tracking-tight">
              Editar Perfil
            </h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                    Nome:
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    placeholder="Primeiro Nome"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                    value={profile?.first_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                    Apelido:
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    placeholder="Segundo Nome"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                    value={profile?.last_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Nome de usuário:
                </label>
                <div className="flex items-center w-full rounded-xl bg-gray-50 border border-gray-100 focus-within:ring-2 focus-within:ring-[#8d984c] transition-all overflow-hidden">
                  <div className="pl-4 pr-1 flex items-center justify-center">
                    <span className="text-[#8d984c] font-bold text-lg select-none">
                      @
                    </span>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="exemplo"
                    className="w-full px-2 py-3 bg-transparent text-[#6c562c] outline-none"
                    value={profile?.username || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Data de Nascimento:
                </label>
                <input
                  type="date"
                  name="birth_date"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={profile?.birth_date || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Telefone:
                </label>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Telefone"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={profile?.phone_number || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Imagem de Perfil:
                </label>
                <input
                  type="file"
                  name="profile_picture"
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#8d984c]/10 file:text-[#8d984c] hover:file:bg-[#8d984c]/20"
                  accept="image/*"
                  onChange={handleInputChange}
                />
              </div>

              {errorMessage && (
                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-[#6c562c] text-white rounded-xl font-bold hover:bg-[#5a4825] transition-colors"
              >
                Salvar Alterações
              </button>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default EditProfilePage;
