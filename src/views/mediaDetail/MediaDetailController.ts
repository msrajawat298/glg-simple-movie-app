import axios, { AxiosInstance } from "axios";
import { MediaDetailStore } from "./MediaDetailStore";

const { VITE_SERVER } = import.meta.env;

export class MediaDetailController {
  private apiInstance: AxiosInstance;

  constructor(private readonly mediaDetailStore: MediaDetailStore) {
    this.apiInstance = axios.create({
      baseURL: `${VITE_SERVER}/api/media`,
    });
  }

  public async getMedia(media_type: string, id: string): Promise<void> {
    const key = `${media_type}:${id}`;

    if (this.mediaDetailStore.hasDataFor(key)) {
      this.mediaDetailStore.setActiveKey(key);
      this.mediaDetailStore.setError(null); // Clear any previous errors
      return;
    }

    try {
      this.mediaDetailStore.setLoading(true);
      this.mediaDetailStore.setError(null);
      const response = await this.apiInstance.get(`${media_type}/${id}`);
      this.mediaDetailStore.cacheDocument(key, response.data.media);
      this.mediaDetailStore.setActiveKey(key);
    } catch (error: any) {
      console.error("Failed to fetch media details", error);
      this.mediaDetailStore.setError(error.message || "Failed to load media details");
    } finally {
      this.mediaDetailStore.setLoading(false);
    }
  }
}
