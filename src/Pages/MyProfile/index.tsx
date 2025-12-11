import React from "react";
import axios from "axios";
import { useState, useEffect, useContext, useCallback } from "react";
import { AuthContext } from "../../Context/auth.context.tsx";
import { IProfileResponse, FollowPayload } from "../../types.ts";
import FollowServices from "../../Services/follow.services.ts";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function ProfileDetailsPage() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const { username } = useParams();
  const { user } = useContext(AuthContext);
  const isCreator = profile && user && profile.creator_id === user.id;

  const fetchFollowStatus = useCallback(async (followedId: number) => {
    try {
      const response = await FollowServices.checkFollowStatus(followedId);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      console.error("Erro ao verificar status de follow:", error);
      setIsFollowing(false);
    }
  }, []);

  const handleFollowToggle = async () => {
    if (!profile || !user) return;

    const followedId = profile.creator_id;

    try {
      if (isFollowing) {
        await FollowServices.unfollow(followedId);
        setIsFollowing(false);
      } else {
        const payload: FollowPayload = { followed_id: followedId };
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
        if (user && data.creator_id !== user.id) {
          fetchFollowStatus(data.creator_id);
        } else {
          setIsFollowing(null);
        }
      } catch (error) {
        console.log(error);
        setProfile(null);
      }
    };

    fetchProfileData();
  }, [username, user, fetchFollowStatus]);

  if (!profile) {
    return (
      <div className="max-w-xl mx-auto bg-white shadow-2xl shadow-green-200/70 p-8 border-4 border-red-500">
        {/* Spinner ou mensagem de carregamento aqui */}
      </div>
    );
  }

  const getInitials = (
    firstName: string | null | undefined,
    lastName: string | null | undefined
  ) => {
    const first = (firstName || "").trim().charAt(0).toUpperCase();
    const last = (lastName || "").trim().charAt(0).toUpperCase();
    return `${first}${last}`;
  };

  const fullName = `${profile.first_name || profile.username || ""} ${
    profile.last_name || ""
  }`.trim();

  return (
    <div className="min-h-screen bg-green-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto bg-white rounded-3xl shadow-2xl shadow-green-200/70 overflow-hidden">
        <div className="h-32 bg-teal-600/80 -mx-8 -mt-8 rounded-t-3xl"></div>
        <div className="p-8 relative">
          <div className="relative -mt-20 flex justify-center mb-6">
            {profile.profile_picture_url ? (
              <img
                src={profile.profile_picture_url}
                alt={`${profile.username}'s profile picture`}
                className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-lg ring-4 ring-emerald-500"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-green-200 text-teal-700 text-3xl font-extrabold border-4 border-white shadow-lg ring-4 ring-emerald-500">
                {getInitials(profile.first_name, profile.last_name)}
              </div>
            )}
          </div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 mb-0 leading-tight">
              {fullName}
            </h1>
            <p className="text-xl text-emerald-600 font-semibold mt-1">
              @{profile.username}
            </p>
          </div>
        </div>

        {/* === AÇÕES/BOTÕES (Separados e estilizados) === */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          {!isCreator && isFollowing !== null && (
            <button
              onClick={handleFollowToggle}
              className={`w-full py-3 px-4 font-bold rounded-lg transition duration-300 shadow-md ${
                isFollowing
                  ? "bg-gray-400 hover:bg-gray-500 text-white shadow-gray-400/50"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-400/50"
              }`}
            >
              {isFollowing ? "Seguindo" : "Seguir"}
            </button>
          )}
          {isCreator && (
            <Link to={`/profile/edit/${username}`} className="w-full">
              <button className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition duration-300 shadow-md shadow-emerald-400/50">
                Editar Perfil
              </button>
            </Link>
          )}

          <Link to="/profile" className="w-full">
            <button className="w-full py-3 px-4 border border-gray-300 bg-white hover:bg-green-100 text-gray-700 font-bold rounded-lg transition duration-300 shadow-sm">
              Voltar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetailsPage;
