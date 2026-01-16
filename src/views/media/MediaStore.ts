import { action, makeObservable, observable, computed } from "mobx";
import { Movie, MediaCategory } from "../../definitions/Movie";

export class MediaStore {
  @observable private accessor _cache = new Map<MediaCategory, Movie[]>();
  @observable private accessor _activeCategory: MediaCategory = "all";
  @observable public accessor isLoading: boolean = false;

  constructor() {
    makeObservable(this);
  }

  @action
  public cacheDocuments(category: MediaCategory, media: Movie[]): void {
    this._cache.set(category, media);
  }

  @action
  public setActiveCategory(category: MediaCategory): void {
    this._activeCategory = category;
  }

  @action
  public setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  @computed
  public get media(): Movie[] {
    return this._cache.get(this._activeCategory) || [];
  }

  @computed
  public get activeCategory(): MediaCategory {
    return this._activeCategory;
  }

  public hasDataFor(category: MediaCategory): boolean {
    return this._cache.has(category);
  }
}
