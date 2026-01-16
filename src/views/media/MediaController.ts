import axios, { AxiosInstance } from "axios";
import { MediaCategory } from "../../definitions/Movie";
import { MediaStore } from "./MediaStore";

const { VITE_SERVER } = import.meta.env;

export class MediaController {
  private apiInstance: AxiosInstance;

  constructor(private readonly mediaStore: MediaStore) {
    this.apiInstance = axios.create({
      baseURL: `${VITE_SERVER}/api/media`,
    });
  }

  public async loadCategory(category: MediaCategory): Promise<void> {
    if (this.mediaStore.hasDataFor(category)) {
      this.mediaStore.setActiveCategory(category);
      return;
    }

    try {
      this.mediaStore.setLoading(true);
      const endpoint = category === "all" ? "trending" : `trending/${category}`;
      const response = await this.apiInstance.get(endpoint);
      this.mediaStore.cacheDocuments(category, response.data.media);
      this.mediaStore.setActiveCategory(category);
    } finally {
      this.mediaStore.setLoading(false);
    }
  }
}
