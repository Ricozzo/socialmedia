import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import axios from "axios";
import { AuthContext } from "../../Context/auth.context.tsx";
import { IEventResponse, IEventDetail } from "../../types.ts";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProfileCard } from "../../Components/ProfileCard";
import { FollowingList } from "../../Components/FollowingList";
import { UpcomingEvents } from "../../Components/UpcomingEvents";
import { Header } from "../../Components/Header/index.tsx";
import { IUser } from "../../types";
import feedService from "../../Services/home.services";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Edit3,
  Info,
  Plus,
  Check,
  Users,
} from "lucide-react";
import { Button } from "../../Components/Ui/button";
import { Card, CardContent } from "../../Components/Ui/card";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function EventDetailsPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState<IEventDetail | null>(null);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [following, setFollowing] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadSidebarData = useCallback(async () => {
    try {
      const response = await feedService.getFeedData(10, 0);
      if (response.data) {
        setProfile(response.data.profile);
        setFollowing(response.data.following || []);
        setEvents(response.data.events || []);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da lateral:", error);
    }
  }, []);

  useEffect(() => {
    loadSidebarData();
    axios
      .get<IEventResponse>(`${API_URL}/api/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => console.log(err));
  }, [eventId, loadSidebarData]);

  const handleToggleParticipation = () => {
    setIsParticipating(!isParticipating);
  };

  if (!event)
    return (
      <div className="min-h-screen bg-[#fdfcf8] flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-[#8d984c] border-t-transparent rounded-full" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fdfcf8]">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 xl:col-span-8 space-y-6 order-2 lg:order-1">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-[#8d984c] hover:text-[#6c562c] font-bold text-xs uppercase tracking-widest transition-all mb-2 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Voltar
            </button>

            <Card className="border-none shadow-[0_8px_40px_rgba(141,152,76,0.08)] rounded-[2.5rem] overflow-hidden bg-white">
              <div className="relative h-[250px] md:h-[400px] w-full bg-[#8d984c]/10">
                <img
                  src={
                    event.event_photo_url ||
                    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070"
                  }
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#6c562c]/90 via-transparent to-transparent flex items-end p-8">
                  <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight">
                    {event.name}
                  </h1>
                </div>
              </div>

              <CardContent className="p-6 md:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-[#8d984c]/5 rounded-2xl border border-[#8d984c]/10">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-[#8d984c]">
                        <Calendar className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-[#8d984c]/60">
                          Data do Evento
                        </p>
                        <p className="font-bold text-[#6c562c]">
                          {event.event_date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-[#8d984c]/5 rounded-2xl border border-[#8d984c]/10">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-[#8d984c]">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-[#8d984c]/60">
                          Horário
                        </p>
                        <p className="font-bold text-[#6c562c]">
                          {event.event_time}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-[#6c562c]/5 rounded-2xl border border-[#6c562c]/10">
                      <div className="bg-white p-2 rounded-lg shadow-sm text-[#6c562c]">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-[#6c562c]/60">
                          Localização
                        </p>
                        <p className="font-bold text-[#6c562c] truncate">
                          {event.address}
                        </p>
                        {event.location_optional && (
                          <p className="text-xs italic text-[#6c562c]/70">
                            {event.location_optional}
                          </p>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleToggleParticipation}
                      className={`w-full py-7 rounded-2xl font-bold transition-all gap-2 shadow-lg active:scale-95 ${
                        isParticipating
                          ? "bg-[#6c562c] hover:bg-[#5a4825] text-white"
                          : "bg-[#8d984c] hover:bg-[#7a853f] text-white shadow-[#8d984c]/20"
                      }`}
                    >
                      {isParticipating ? (
                        <>
                          <Check className="h-5 w-5" /> Presença Confirmada
                        </>
                      ) : (
                        <>
                          <Plus className="h-5 w-5" /> Participar do Evento
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="bg-[#fdfcf8] p-6 rounded-[2rem] border border-[#8d984c]/10">
                  <div className="flex items-center gap-2 text-[#6c562c] mb-4">
                    <Info className="h-5 w-5 opacity-70" />
                    <h3 className="font-serif text-xl font-bold text-[#6c562c]">
                      Sobre o evento
                    </h3>
                  </div>
                  <p className="text-[#6c562c]/80 leading-relaxed whitespace-pre-wrap font-medium">
                    {event.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#8d984c]/10 flex justify-between items-center">
                  <Link to={`/events/edit/${eventId}`}>
                    <Button
                      variant="ghost"
                      className="text-[#8d984c] hover:bg-[#8d984c]/5 rounded-xl gap-2 font-bold uppercase text-[10px] tracking-widest"
                    >
                      <Edit3 className="h-4 w-4" /> Editar Evento
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </section>

          <aside className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-24 order-1 lg:order-2">
            {profile ? (
              <ProfileCard user={profile} followingCount={following.length} />
            ) : (
              <div className="h-48 w-full bg-[#8d984c]/5 animate-pulse rounded-[2.5rem]" />
            )}

            <FollowingList following={following} />

            <div className="bg-white rounded-[2rem] p-6 shadow-[0_4px_20px_rgba(141,152,76,0.05)] border border-[#8d984c]/5">
              <h4 className="font-serif font-bold text-[#6c562c] mb-4 flex items-center gap-2">
                <Users className="h-4 w-4" /> Outros Eventos
              </h4>
              <UpcomingEvents events={events.slice(0, 3)} />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default EventDetailsPage;
