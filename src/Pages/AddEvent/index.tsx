import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../../Services/event.service";
import { IEventDetail } from "../../types";
import { Header } from "../../Components/Header";
import { ProfileCard } from "../../Components/ProfileCard";
import { FollowingList } from "../../Components/FollowingList";
import { UpcomingEvents } from "../../Components/UpcomingEvents";
import { IUser } from "../../types";
import feedService from "../../Services/home.services";

function AddEvent(): JSX.Element {
  const [eDetail, setEvent] = useState<IEventDetail>({
    name: "",
    description: "",
    event_date: "",
    event_time: "",
    address: "",
    location_optional: "",
    event_photo_url: "",
  });
  const [profile, setProfile] = useState<IUser | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const LIMIT = 10;

  const loadFeed = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await feedService.getFeedData(LIMIT, offset);
      if (!response.data || response.data.events.length === 0) {
        setHasMore(false);
        return;
      }

      const {
        events: newEvents,
        profile: userProfile,
        following: userFollowing,
      } = response.data;

      if (!profile && userProfile) setProfile(userProfile);
      if (userFollowing) setFollowing(userFollowing);

      setEvents((prev) => {
        const existingIds = new Set(prev.map((e) => e._id));
        const uniqueNewEvents = newEvents.filter(
          (e) => !existingIds.has(e._id)
        );

        return [...prev, ...uniqueNewEvents];
      });

      if (newEvents.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar o feed real:", error);
    } finally {
      setLoading(false);
    }
  }, [offset, hasMore, loading, profile]);

  useEffect(() => {
    loadFeed();
  }, [offset]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setOffset((prev) => prev + LIMIT);
        }
      },
      { threshold: 0.1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  const navigate = useNavigate();

  const handleEventChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEvent((prevDetail) => ({
      ...prevDetail,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const uploadData = new FormData();

    Object.keys(eDetail).forEach((key) => {
      if (key !== "event_photo_url" || eDetail[key as keyof IEventDetail]) {
        uploadData.append(
          key,
          eDetail[key as keyof IEventDetail] as string | Blob
        );
      }
    });

    if (fileToUpload) {
      uploadData.append("eventPicture", fileToUpload);
    }
    eventService
      .createEvent(uploadData)
      .then((response) => {
        navigate("/events");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data.message || "Ocorreu um erro ao criar o evento.";
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
    <div className="min-h-screen bg-[#fdfcf8]">
      <Header />
      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h3 className="text-4xl font-serif font-bold text-[#6c562c] tracking-tight">
              Criar um novo Evento
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                    Titulo do evento:
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome do Evento"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                    value={eDetail.name}
                    onChange={handleEventChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Descrição do Evento:
                </label>
                <input
                  type="text"
                  name="description"
                  placeholder="Adicione uma descrição para o evento..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={eDetail.description}
                  onChange={handleEventChange}
                />
              </div>
              <div></div>
              <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                Data:
              </label>
              <input
                type="date"
                name="event_date"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                value={eDetail.event_date}
                onChange={handleEventChange}
              />
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Horário:
                </label>
                <input
                  type="time"
                  name="event_time"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={eDetail.event_time}
                  onChange={handleEventChange}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Endereço:
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Endereço"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={eDetail.address}
                  onChange={handleEventChange}
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                  Endereço 2 (Opcional):
                </label>
                <input
                  type="text"
                  name="location_optional"
                  placeholder="Complemento (apartamento, bloco, lote, complemento)"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[#6c562c] focus:ring-2 focus:ring-[#8d984c] outline-none"
                  value={eDetail.location_optional}
                  onChange={handleEventChange}
                />
              </div>
              <div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-[#6c562c] mb-1 ml-1">
                    Imagem do Evento:
                  </label>
                  <br />
                  <input
                    type="file"
                    name="eventPicture"
                    className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#8d984c]/10 file:text-[#8d984c] hover:file:bg-[#8d984c]/20"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <div>
                <button
                  className="w-full bg-[#8d984c] hover:bg-[#6c562c] text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-[#8d984c]/20 mt-4 uppercase tracking-widest text-sm"
                  type="submit"
                >
                  Criar Evento
                </button>
              </div>
            </form>
          </section>
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            {profile && (
              <ProfileCard user={profile} followingCount={following.length} />
            )}

            <FollowingList following={following} />
            <UpcomingEvents events={events} />
          </aside>
        </div>
      </main>
    </div>
  );
}

export default AddEvent;
