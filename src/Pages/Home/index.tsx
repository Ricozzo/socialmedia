import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "../../Components/Header";
import { EventCard } from "../../Components/EventCard";
import { ProfileCard } from "../../Components/ProfileCard";
import { FollowingList } from "../../Components/FollowingList";
import { UpcomingEvents } from "../../Components/UpcomingEvents";
import feedService from "../../Services/home.services";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types";
import { Loader2 } from "lucide-react";

const Index: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [following, setFollowing] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const loaderRef = useRef<HTMLDivElement | null>(null);
  const LIMIT = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const loadFeed = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const response = await feedService.getFeedData(LIMIT, offset);

      if (
        !response.data ||
        !response.data.events ||
        response.data.events.length === 0
      ) {
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
        const existingIds = new Set(prev.map((e) => e.id));
        const uniqueNewEvents = newEvents.filter(
          (e: any) => !existingIds.has(e.id)
        );
        return [...prev, ...uniqueNewEvents];
      });

      if (newEvents.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar o feed:", error);
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

  return (
    <div className="min-h-screen bg-[#fdfcf8]">
      <Header />

      <main className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <section className="lg:col-span-7 xl:col-span-8 space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-2 px-2">
              <h2 className="font-serif text-xl font-bold text-[#6c562c]">
                Explorar Eventos
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {events.map((event, index) => (
                <div
                  key={`${event.id}-${index}`}
                  className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out"
                  style={{ animationDelay: `${(index % 3) * 150}ms` }}
                >
                  <EventCard {...event} />
                </div>
              ))}
            </div>

            <div
              ref={loaderRef}
              className="py-16 flex flex-col items-center justify-center gap-4"
            >
              {loading && (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-[#8d984c] opacity-60" />
                  <p className="text-sm font-medium text-[#8d984c]/70 italic">
                    Cultivando mais conteúdo...
                  </p>
                </div>
              )}

              {!hasMore && events.length > 0 && (
                <div className="text-center space-y-4 w-full">
                  <div className="h-px w-24 bg-[#8d984c]/20 mx-auto" />
                  <p className="font-serif italic text-[#8d984c]/60">
                    Você chegou ao fim da sua jornada por hoje.
                  </p>
                </div>
              )}

              {events.length === 0 && !loading && (
                <div className="text-center py-20 bg-white/50 rounded-[2rem] border-2 border-dashed border-[#8d984c]/20 w-full">
                  <p className="text-[#6c562c] font-medium">
                    Nenhum evento encontrado no momento.
                  </p>
                </div>
              )}
            </div>
          </section>

          <aside className="lg:col-span-5 xl:col-span-4 space-y-8 lg:sticky lg:top-24 order-1 lg:order-2">
            {profile ? (
              <div className="animate-in fade-in slide-in-from-right-8 duration-700">
                <ProfileCard user={profile} followingCount={following.length} />
              </div>
            ) : (
              <div className="h-48 w-full bg-[#8d984c]/5 animate-pulse rounded-[2rem]" />
            )}

            <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
              <FollowingList following={following} />
            </div>

            <div className="animate-in fade-in slide-in-from-right-8 duration-700 delay-400">
              <UpcomingEvents
                events={events.slice(0, 3)}
                currentUserId={profile?.id || ""}
              />
            </div>

            <div className="pt-4 px-6">
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-[#8d984c]/50">
                <span className="hover:text-[#8d984c] cursor-pointer transition-colors">
                  Privacidade
                </span>
                <span className="hover:text-[#8d984c] cursor-pointer transition-colors">
                  Termos
                </span>
                <span className="hover:text-[#8d984c] cursor-pointer transition-colors">
                  Ajuda
                </span>
              </div>
              <p className="mt-4 text-[10px] text-[#8d984c]/30 font-bold uppercase tracking-[0.2em]">
                © 2026 Kaax
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
