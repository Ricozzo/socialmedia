import React, { useState, useEffect } from "react";
import { Header } from "../../Components/Header/index";
import { EventCard } from "../../Components/EventCard/index";
import EventService from "../../Services/event.service.ts";

const Index = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await EventService.getAllEvents();
      setEvents(response.data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h1 className="sr-only">Feed de Eventos Kaax</h1>
            
            {/* 4. Agora fazemos o map no estado 'events' */}
            {events.length > 0 ? (
              events.map((event) => (
                <EventCard key={event._id} {...event} />
              ))
            ) : (
              <p>Carregando eventos...</p>
            )}
          </section>

          {/* Sidebar ... (mantenha o restante como está) */}
        </div>
      </main>
    </div>
  );
};

export default Index;