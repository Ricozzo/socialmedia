//CHECK IF USER IS ADMIN
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../Context/auth.context";
//
import axios from "axios";
import { Link } from "react-router-dom";

import AddEvent from "../AddEvent";

const API_URL = import.meta.env.VITE_APP_SERVER_URL;

function EventsListPage() {
  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    axios
      .get(`${API_URL}/api/events`)
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  };

  //CHECK IF USER IS ADMIN
  const {user} = useContext(AuthContext)
  const [isAdmin, setisAdmin] = useState(false)
  const checkAdmin = () => {
    if (user.email === "admin@admin.com"){
      setisAdmin(true)
    }
  }
  
  useEffect(() => {
    getAllEvents();
    checkAdmin()
  }, []);
  //

  return (
    <div className="event-list-page">
    {/* CHECK IF USER IS ADMIN */}
    { isAdmin && (
      <AddEvent getAllEvents={getAllEvents} />
    )}
    {/*------------------------*/}
    <h1 className="eventsPagetitle">Events</h1>
    <h2>Join Us</h2>
      <div className="event-card-container">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <Link to={`/events/${event.id}`}>
              <div className="event-content">
                <div className="event-image">
                  <img src={event.imageUrl} alt="" className="event-image" />
                </div>
                <div className="event-details">
                  <h3 className="event-title">{event.title}</h3>
                  {/* <p className="event-description">{event.description}</p> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventsListPage;
