import { action, makeObservable, observable, computed } from "mobx";
import { Movie } from "../../definitions/Movie";

export class MediaDetailStore {
  @observable private accessor _cache = new Map<string, Movie>();
  @observable private accessor _activeKey: string = "";
  @observable public accessor isLoading: boolean = false;
  @observable public accessor error: string | null = null;

  constructor() {
    makeObservable(this);
  }

  @action
  public cacheDocument(key: string, media: Movie): void {
    this._cache.set(key, media);
  }

  @action
  public setActiveKey(key: string): void {
    this._activeKey = key;
  }

  @action
  public setLoading(loading: boolean): void {
    this.isLoading = loading;
  }

  @action
  public setError(error: string | null): void {
    this.error = error;
  }

  @computed
  public get media(): Movie | undefined {
    return this._cache.get(this._activeKey);
  }

  public hasDataFor(key: string): boolean {
    return this._cache.has(key);
  }
}
