import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context.tsx";
import { IProfileResponse, FollowPayload } from "../../types.ts";
import FollowServices from "../../Services/follow.services.ts";
import { Header } from "../../Components/Header";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function ProfileDetailsPage() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const { username } = useParams();
  const { user } = useContext(AuthContext);

  // 1. Definição clara dos IDs para evitar erros de tipo (string vs number)
  const profileId = profile?.id ? Number(profile.id) : null;
  const loggedInUserId = user?.userId ? Number(user.userId) : null;

  // Só é o criador se os IDs forem iguais e existirem
  const isCreator = !!(
    profileId &&
    loggedInUserId &&
    profileId === loggedInUserId
  );

  const fetchFollowStatus = useCallback(async (targetId: number) => {
    try {
      const response = await FollowServices.checkFollowStatus(targetId);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error("Erro ao verificar status de follow:", error);
      setIsFollowing(false);
    }
  }, []);

  const handleFollowToggle = async () => {
    if (!profileId) return;

    try {
      if (isFollowing) {
        await FollowServices.unfollow(profileId);
        setIsFollowing(false);
      } else {
        const payload: FollowPayload = { followed_id: profileId };
        await FollowServices.follow(payload);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Erro na ação de follow:", error);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get<IProfileResponse>(
          `${API_URL}/api/profile/${username}`
        );
        const data = response.data;
        setProfile(data);

        // Busca eventos associados a este perfil
        const eventsResponse = await axios.get(
          `${API_URL}/api/events/user/${data.id}`
        );
        setEvents(eventsResponse.data);

        // Lógica de Follow: só checa se não for o próprio perfil
        const viewedId = Number(data.id);
        const currentId = user?.userId ? Number(user.userId) : null;

        if (currentId && viewedId && viewedId !== currentId) {
          fetchFollowStatus(viewedId);
        } else {
          setIsFollowing(null); // Esconde o botão se for o próprio dono
        }
      } catch (error) {
        console.error("Erro ao carregar dados da página:", error);
        setProfile(null);
      }
    };

    if (username) fetchProfileData();
  }, [username, user?.userId, fetchFollowStatus]);

  if (!profile) {
    return (
      <div className="p-20 text-center font-bold">Carregando perfil...</div>
    );
  }

  const getInitials = (first?: string, last?: string) =>
    `${(first || "").charAt(0)}${(last || "").charAt(0)}`.toUpperCase();

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    profile.username;

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-green-50 py-16 px-4">
        <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header Decorativo */}
          <div className="h-32 bg-teal-600/80"></div>

          <div className="p-8 relative">
            {/* Foto de Perfil */}
            <div className="relative -mt-20 flex justify-center mb-6">
              {profile.profile_picture_url ? (
                <img
                  src={profile.profile_picture_url}
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-200 text-teal-700 text-3xl font-black border-4 border-white shadow-lg ">
                  {getInitials(profile.first_name, profile.last_name)}
                </div>
              )}
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-gray-900">{fullName}</h1>
              <p className="text-xl text-emerald-600 font-semibold mt-1">
                @{profile.username}
              </p>
            </div>

            {/* Seção de Botões */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Botão Seguir/Seguindo: Só aparece se NÃO for o dono e se soubermos o status */}
              {!isCreator && isFollowing !== null && (
                <button
                  onClick={handleFollowToggle}
                  className={`w-full py-3 px-4 font-bold rounded-lg transition duration-300 shadow-md ${
                    isFollowing
                      ? "bg-gray-400 hover:bg-gray-500 text-white"
                      : "bg-emerald-600 hover:bg-emerald-700 text-white"
                  }`}
                >
                  {isFollowing ? "Seguindo" : "Seguir"}
                </button>
              )}

              {/* Botão Editar: Só aparece para o dono */}
              {isCreator && (
                <Link to={`/profile/edit/${username}`} className="w-full">
                  <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md">
                    Editar Perfil
                  </button>
                </Link>
              )}

              <Link to="/profile" className="w-full">
                <button className="w-full py-3 px-4 border border-gray-300 bg-white hover:bg-green-100 text-gray-700 font-bold rounded-lg transition shadow-sm">
                  Voltar
                </button>
              </Link>
            </div>
          </div>

          {/* Listagem de Eventos */}
          <div className="p-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Eventos Criados
            </h2>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <Link
                    key={event.id}
                    to={`/events/${event.id}`}
                    className="block p-4 border rounded-xl hover:bg-green-50 transition-colors"
                  >
                    <h3 className="font-bold text-teal-700">{event.name}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.event_date).toLocaleDateString()}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">
                Este usuário ainda não criou eventos.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsPage;
