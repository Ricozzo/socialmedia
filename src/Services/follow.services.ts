import axios, { AxiosInstance, AxiosResponse } from "axios";
import { FollowPayload, Follow } from "../types";

class FollowServices {
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

  // POST /api/follows
  public follow = (
    requestBody: FollowPayload
  ): Promise<AxiosResponse<{ follow: Follow }>> => {
    return this.api.post<{ follow: Follow }>("/api/follows", requestBody);
  };

  // DELETE /api/follows/:followedId
  public unfollow = (followedId: string): Promise<AxiosResponse<void>> => {
    return this.api.delete(`/api/follows/${followedId}`);
  };
}

const followServices: FollowServices = new FollowServices();

export default followServices;
