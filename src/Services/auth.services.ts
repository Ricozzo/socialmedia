import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ILoginPayload, ILoginResponse, ISignupPayload, IUser, IProfileResponse } from "../types";

class AuthService {
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

  public login = (
    requestBody: ILoginPayload
  ): Promise<AxiosResponse<ILoginResponse>> => {
    return this.api.post<ILoginResponse>("/api/login", requestBody);
  };

  public signup = (
    requestBody: ISignupPayload
  ): Promise<AxiosResponse<ILoginResponse>> => {
    return this.api.post<ILoginResponse>("/api/signup", requestBody);
  };

  public verify = (): Promise<AxiosResponse<IUser>> => {
    return this.api.get<IUser>("/api/verify");
  };
}

const authService: AuthService = new AuthService();

export default authService;
