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
    event_photo_url: "",
  });
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
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
  console.log("Aqui o handle submit", handleSubmit)
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length > 0) {
      setFileToUpload(e.target.files[0]);
    } else {
      setFileToUpload(null);
    }
  };
  console.log("Aqui o file change", handleFileChange)

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
        <div>
          <label>Imagem do Evento:</label>
          <br />
          <input
            type="file"
            name="eventPicture"
            accept="image/*"
            onChange={handleFileChange}
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
