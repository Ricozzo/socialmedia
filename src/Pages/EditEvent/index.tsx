import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { IEventResponse } from "../../types.ts";
import { Header } from "../../Components/Header";
import eventService from "../../Services/event.service";

const API_URL = import.meta.env.VITE_API_SERVER_URL;

function EditEventPage() {
  const [event, setEvent] = useState<IEventResponse | null>(null);
  const { eventId } = useParams();
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<IEventResponse>(`${API_URL}/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (event) {
      setEvent({
        ...event,
        [name]: value,
      });
    }
  };

  const handleFormSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!event) return;
    eventService
      .updateEvent(eventId as string, event)
      .then((response) => {
        navigate(`/events/${eventId}`);
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data.message ||
          "Ocorreu um erro ao atualizar o evento.";
        setErrorMessage(errorDescription);
      });
  };

  // const deleteEventSubmit = () => {
  //   if (!event) return;
  //   eventService
  //     .deleteEvent(eventId as string)
  //     .then(() => {
  //       navigate("/events");
  //     })
  //     .catch((error) => {
  //       const errorDescription =
  //         error.response?.data.message ||
  //         "Ocorreu um erro ao deletar o evento.";
  //       setErrorMessage(errorDescription);
  //     });
  // };

  return (
    <div className="min-h-screen bg-[#fdfcf8]">
      <Header />
      <main className="container px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <section className="lg:col-span-7 xl:col-span-8 space-y-6">
            <h3>Editar o Evento</h3>

            <form onSubmit={handleFormSubmit}>
              <label>Título do evento:</label>
              <input
                type="text"
                name="name"
                value={event?.name}
                onChange={handleInputChange}
              />

              <label>Descrição do evento:</label>
              <input
                type="text"
                name="description"
                value={event?.description}
                onChange={handleInputChange}
              />
              <label>Data:</label>
              <input
                type="date"
                name="event_date"
                value={event?.event_date}
                onChange={handleInputChange}
              />
              <label>Horário:</label>
              <input
                type="time"
                name="event_time"
                value={event?.event_time}
                onChange={handleInputChange}
              />
              <label>Endereço:</label>
              <input
                type="text"
                name="address"
                value={event?.address}
                onChange={handleInputChange}
              />
              <label>Endereço 2 (Opcional):</label>
              <input
                type="text"
                name="location_optional"
                value={event?.location_optional}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}

              <button type="submit">Salvar</button>
            </form>
            {/* <button onClick={deleteEventSubmit}>Deletar Evento</button> */}
          </section>
        </div>
      </main>
    </div>
  );
}

export default EditEventPage;
