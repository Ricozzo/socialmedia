import axios, { AxiosInstance, AxiosResponse } from "axios";

class FeedService {
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

  /**
   * GET /api/feed
   * @param limit
   * @param offset
   */
  public getFeedData = (
    limit: number = 10,
    offset: number = 0
  ): Promise<AxiosResponse<any>> => {
    return this.api.get("/api/feed", {
      params: { limit, offset },
    });
  };
}

const feedService: FeedService = new FeedService();
export default feedService;
