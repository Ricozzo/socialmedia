import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../../Services/event.service";
import { IEventDetail } from "../../types";

function AddEvent(): JSX.Element {
  const [eDetail, setEvent] = useState<IEventDetail>({
    name: "",
    description: "",
    event_date: "",
    event_time: "",
    address: "",
    location_optional: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

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
    eventService
      .createEvent(eDetail)
      .then((response) => {
        navigate("/events");
      })
      .catch((error) => {
        const errorDescription =
          error.response?.data.message || "Ocorreu um erro ao criar o evento.";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="add-event">
      <h3>Novo Evento</h3>

      <form onSubmit={handleSubmit}>
        <div className="admAddEvent">
          <label>Titulo do evento:</label>
          <input
            type="text"
            name="name"
            value={eDetail.name}
            onChange={handleEventChange}
          />

          <label>Descrição do Evento:</label>
          <input
            type="text"
            name="description"
            value={eDetail.description}
            onChange={handleEventChange}
          />

          <label>Data:</label>
          <input
            type="date"
            name="event_date"
            value={eDetail.event_date}
            onChange={handleEventChange}
          />

          <label>Horário:</label>
          <input
            type="time"
            name="event_time"
            value={eDetail.event_time}
            onChange={handleEventChange}
          />

          <label>Endereço:</label>
          <input
            type="text"
            name="address"
            value={eDetail.address}
            onChange={handleEventChange}
          />

          <label>Endereço 2 (Opcional):</label>
          <input
            type="text"
            name="location_optional"
            value={eDetail.location_optional}
            onChange={handleEventChange}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <div>
          <button type="submit">Criar Evento</button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
