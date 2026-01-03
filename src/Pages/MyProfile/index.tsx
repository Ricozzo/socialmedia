import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context.tsx";
import { IProfileResponse } from "../../types.ts";
import FollowServices from "../../Services/follow.services.ts";
import feedService from "../../Services/home.services";
import { Header } from "../../Components/Header";
import { FollowingList } from "../../Components/FollowingList";
import { UpcomingEvents } from "../../Components/UpcomingEvents";
import { EventCard } from "../../Components/EventCard";
import { Link, useParams } from "react-router-dom";
import { Loader2, ArrowLeft, Edit3, UserPlus, UserMinus } from "lucide-react";
import { Button } from "../../Components/Ui/button";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function ProfileDetailsPage() {
  const [profile, setProfile] = useState<IProfileResponse | null>(null);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [following, setFollowing] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);

  const { username } = useParams();
  const { user: loggedInUser } = useContext(AuthContext);
  const LIMIT = 10;

  const isCreator = !!(
    profile?.id &&
    loggedInUser?.id &&
    Number(profile.id) === Number(loggedInUser.id)
  );

  const fetchFollowStatus = useCallback(async (targetId: number) => {
    try {
      const response = await FollowServices.checkFollowStatus(targetId);
      setIsFollowing(response.data.isFollowing);
    } catch (error) {
      setIsFollowing(false);
    }
  }, []);

  const loadFeedSidebar = useCallback(async () => {
    try {
      const response = await feedService.getFeedData(LIMIT, 0);
      if (response.data?.following) setFollowing(response.data.following);
    } catch (error) {
      console.error("Erro sidebar:", error);
    }
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get<IProfileResponse>(
          `${API_URL}/api/profile/${username}`
        );
        setProfile(response.data);

        const eventsResponse = await axios.get(
          `${API_URL}/api/events/user/${response.data.id}`
        );
        setEvents(eventsResponse.data);

        if (
          loggedInUser?.id &&
          Number(response.data.id) !== Number(loggedInUser.id)
        ) {
          fetchFollowStatus(Number(response.data.id));
        }
        loadFeedSidebar();
      } catch (error) {
        setProfile(null);
      }
    };
    if (username) fetchProfileData();
  }, [username, loggedInUser?.id, fetchFollowStatus, loadFeedSidebar]);

  const handleFollowToggle = async () => {
    if (!profile?.id) return;
    try {
      if (isFollowing) {
        await FollowServices.unfollow(Number(profile.id));
        setIsFollowing(false);
      } else {
        await FollowServices.follow({ followed_id: Number(profile.id) });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Erro follow:", error);
    }
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-[#fdfcf8] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#8d984c]" />
      </div>
    );

  const fullName =
    `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
    profile.username;

  return (
    <div className="min-h-screen bg-[#fdfcf8] text-[#6c562c]">
      <Header />

      <main className="container max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* Header do Perfil Estilizado */}
            <div className="bg-white rounded-[2.5rem] shadow-[0_4px_20px_rgba(141,152,76,0.1)] overflow-hidden border border-[#8d984c]/5">
              <div className="h-40 bg-[#8d984c]/20 relative">
                <Link to="/" className="absolute top-6 left-6">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-[#6c562c] gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" /> Voltar
                  </Button>
                </Link>
              </div>

              <div className="px-8 pb-8 relative">
                {/* Avatar Posicionado */}
                <div className="relative -mt-16 flex items-end justify-between mb-6 px-2">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[2rem] border-4 border-[#fdfcf8] overflow-hidden shadow-xl bg-white">
                      {profile.profile_picture_url ? (
                        <img
                          src={profile.profile_picture_url}
                          alt={fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[#8d984c]/10 text-[#8d984c] text-4xl font-serif">
                          {profile.username.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex gap-3 pb-2">
                    {isCreator ? (
                      <Link to={`/profile/edit/${username}`}>
                        <Button className="bg-[#8d984c] hover:bg-[#6c562c] text-white rounded-2xl px-6 gap-2 shadow-md shadow-[#8d984c]/20">
                          <Edit3 className="h-4 w-4" /> Editar Perfil
                        </Button>
                      </Link>
                    ) : (
                      isFollowing !== null && (
                        <Button
                          onClick={handleFollowToggle}
                          variant={isFollowing ? "outline" : "default"}
                          className={`rounded-2xl px-8 font-bold transition-all ${
                            isFollowing
                              ? "border-[#8d984c] text-[#8d984c] hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                              : "bg-[#8d984c] hover:bg-[#6c562c] text-white"
                          }`}
                        >
                          {isFollowing ? (
                            <>
                              <UserMinus className="h-4 w-4 mr-2" /> Seguindo
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" /> Seguir
                            </>
                          )}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <h1 className="text-3xl font-serif font-bold text-[#6c562c] tracking-tight">
                    {fullName}
                  </h1>
                  <p className="text-[#8d984c] font-medium text-lg italic">
                    @{profile.username}
                  </p>
                </div>
              </div>

              <div className="flex border-t border-[#8d984c]/10 bg-[#8d984c]/5 py-4 px-8 gap-8">
                <div className="text-center">
                  <span className="block font-bold text-[#6c562c]">
                    {events.length}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                    Eventos
                  </span>
                </div>
                <div className="text-center">
                  <span className="block font-bold text-[#6c562c]">
                    {following.length}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest font-bold opacity-60">
                    Seguidores
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                <h2 className="font-serif text-2xl font-bold text-[#6c562c]">
                  Eventos Criados
                </h2>
                <div className="h-px flex-1 bg-[#8d984c]/20 ml-4" />
              </div>

              {events.length > 0 ? (
                <div className="grid gap-8">
                  {events.map((event) => (
                    <EventCard
                      key={event.id}
                      {...event}
                      username={profile.username}
                      profile_picture_url={profile.profile_picture_url}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white/50 rounded-[2.5rem] border-2 border-dashed border-[#8d984c]/20">
                  <p className="text-[#8d984c]/60 italic">
                    Nenhum evento criado por aqui ainda...
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-24">
            <FollowingList following={following} />
            <UpcomingEvents
              events={events.slice(0, 3)}
              currentUserId={String(profile.id)}
            />

            <footer className="px-6 py-4 opacity-40 text-[10px] font-bold uppercase tracking-[0.2em]">
              © 2026 Kaax • Organic Community
            </footer>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default ProfileDetailsPage;
