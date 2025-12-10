import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth.context.tsx";
import { IEventResponse } from "../../types.ts";
import { Link, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function EventDetailsPage() {
  const [event, setEvent] = useState<IEventResponse | null>(null);
  const { eventId } = useParams();
  const { user } = useContext(AuthContext);
  const isCreator = event && user && event.creator_id === user.id;

  useEffect(() => {
    axios
      .get<IEventResponse>(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => console.log(error));
  }, [eventId]);

  if (!event) return <div>Carregando evento...</div>;

  return (
    <div className="event-details">
      {event && (
        <div className="perEvent">
          <h1 className="name">{event.name}</h1>
          <p>{event.description}</p>
          <p>{event.event_date}</p>
          <p>{event.event_time}</p>
          <p>{event.address}</p>
          <p>{event.location_optional}</p>
        </div>
      )}

      {isCreator && (
        <Link to={`/events/edit/${eventId}`}>
          <button>Edit Event</button>
        </Link>
      )}
      <Link to="/events">
        <button>Back to events</button>
      </Link>
    </div>
  );
}

export default EventDetailsPage;
