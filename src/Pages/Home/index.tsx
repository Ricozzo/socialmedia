import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "../../Components/Header";
import { EventCard } from "../../Components/EventCard";
import { ProfileCard } from "../../Components/ProfileCard";
import { FollowersList } from "../../Components/FollowersList";
import { UpcomingEvents } from "../../Components/UpcomingEvents";
import feedService from "../../Services/home.services";
import { IEventResponse, IUser } from "../../types";

const Index: React.FC = () => {
  const [events, setEvents] = useState<IEventResponse[]>([]);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

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
        recentFollowers,
      } = response.data;

      if (!profile && userProfile) setProfile(userProfile);
      if (recentFollowers) setFollowers(recentFollowers);

      setEvents((prev) => [...prev, ...newEvents]);

      if (newEvents.length < LIMIT) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar o feed real:", error);
    } finally {
      setHasMore(false);
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feed de Eventos - Centro */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h1 className="sr-only">Feed de Eventos Kaax</h1>

            {events.map((event, index) => (
              <EventCard key={`${event._id}-${index}`} {...event} />
            ))}

            {/* Sentinela do Scroll */}
            <div ref={loaderRef} className="py-4 text-center">
              {loading && (
                <p className="text-sm animate-pulse">
                  Carregando mais eventos...
                </p>
              )}
              {!hasMore && events.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Você chegou ao fim do feed. ✨
                </p>
              )}
            </div>
          </section>

          {/* Sidebar Direita */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            {profile && (
              <ProfileCard user={profile} followersCount={followers.length} />
            )}

            <FollowersList followers={followers} />

            {/* Aqui você pode filtrar os eventos para mostrar apenas os "próximos" */}
            {/* <UpcomingEvents events={events.slice(0, 3)} /> */}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
