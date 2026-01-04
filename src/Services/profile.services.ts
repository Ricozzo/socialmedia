import axios, { AxiosInstance, AxiosResponse } from "axios";
import { IProfile } from "../types";

class ProfileService {
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

  // GET /api/profile/:username
  public myProfile = (username: string): Promise<AxiosResponse<IProfile>> => {
    return this.api.get<IProfile>(`/api/profile/${username}`);
  };

   // GET /api/profile/search
  public searchProfiles = (q: string): Promise<AxiosResponse<IProfile[]>> => {
    return this.api.get<IProfile[]>(`/api/profile/search?q=${q}`);
  };
}

const profileService: ProfileService = new ProfileService();

export default profileService;
