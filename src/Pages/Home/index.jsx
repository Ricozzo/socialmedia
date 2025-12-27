import { Header } from "../../Components/Header/index";
import { EventCard } from "../../Components/EventCard/index";
import { ProfileCard } from "../../Components/ProfileCard/index";
import { FollowersList } from "../../Components/FollowersList/index";
import { UpcomingEvents } from "../../Components/UpcomingEvents/index";
import { FollowServices } from "../../Services/follow.services.ts";
import { ProfileService } from "../../Services/profile.services.ts";
import { EventService } from "../../Services/event.service.ts"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feed de Eventos - Centro */}
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h1 className="sr-only">Feed de Eventos Kaax</h1>
            {EventService.map((EventService) => (
              <EventCard key={EventService.id} event={EventService} />
            ))}
          </section>

          {/* Sidebar Direita */}
          <aside className="lg:col-span-5 xl:col-span-4 space-y-6">
            <ProfileCard
              user={ProfileService}
              followersCount={FollowServices.length}
            />
            <FollowersList FollowServices={FollowServices} />
            {/* <UpcomingEvents EventService={upcomingEvents} /> */}
          </aside>
        </div>
      </main>
    </div>
  );
};

export default Index;
