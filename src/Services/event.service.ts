import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IEventResponse, IEventDetail } from "../types";

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
  public getAllEvents = (): Promise<AxiosResponse<IEventResponse[]>> => {
    return this.api.get("/api/events");
  };

  // GET /api/events/:id
  public getEvents = (id: string): Promise<AxiosResponse<IEventResponse>> => {
    return this.api.get(`/api/events/${id}`);
  };

  // PUT /api/events/:id
  public updateEvent = (
    id: string,
    requestBody: IEventDetail
  ): Promise<AxiosResponse<IEventResponse>> => {
    return this.api.put<IEventResponse>(`/api/events/${id}`, requestBody);
  };

  // DELETE /api/events/:id
  public deleteEvent = (id: string): Promise<AxiosResponse<void>> => {
    return this.api.delete(`/api/events/${id}`);
  };
}

const eventService: EventService = new EventService();

export default eventService;
