import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEvent({ getAllEvents }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [eventImage, seteventImage] = useState("");
  const [information, setInformation] = useState("");

  const navigate = useNavigate();

  const handleImageChange = async (e) => {
    try {
      setUploading(true);
      const uploadData = new FormData();
      uploadData.append("imageUrl", e.target.files[0]);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/upload`,
        uploadData
      );

      seteventImage(response.data.fileUrl);
      setUploading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const body = {
        title,
        description,
        information,
        imageUrl: eventImage,
      };
      await axios.post(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/events`,
        body
      );
      getAllEvents();
      setTitle("");
      setDescription("");
      setInformation("");
      seteventImage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add-event">
      <h3>Add Event</h3>

      <form onSubmit={handleSubmit}>
        <div className="admAddEvent">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e)} // Chame a função handleImageChange para atualizar a imagem selecionada
          />
          {uploading ? (
            <p>Image Uploading, please wait</p>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
