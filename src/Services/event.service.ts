import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ILoginPayload, IEventResponse, IEventDetail, IUser } from "../types";


class EventService {
  private api: AxiosInstance;

  constructor() {
        this.api = axios.create({
          baseURL: import.meta.env.VITE_API_SERVER_URL || "http://localhost:3000",
        });

    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }

      return config;
    });
  }

  // POST /api/events
  public createEvent = (
    requestBody: IEventDetail
    ): Promise<AxiosResponse<IEventResponse>> => {
      return this.api.post<IEventResponse>("/api/events", requestBody);
    };

  // GET /api/events
  // getAllEvents = () => {
  //   return this.api.get('/api/events');
  // };

  // GET /api/events/:id
  // getEvents = id => {
  //   return this.api.get(`/api/events/${id}`);
  // };

  // PUT /api/events/:id
  // updateEvent = (id, requestBody) => {
  //   return this.api.put(`/api/events/${id}`, requestBody);
  // };

  // DELETE /api/events/:id
  // deleteEvent = id => {
  //   return this.api.delete(`/api/events/${id}`);
  // };
}

// Create one instance object
const eventsService = new EventsService();

export default eventsService;