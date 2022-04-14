import { baseRepository } from "./axios";
import { requests } from "./constants";
import { DiscoverTVShowsResponse } from "./types/discoverTVShows";

export const discoverMovieShowsAPI =
  async (): Promise<DiscoverTVShowsResponse> => {
    const res = await baseRepository.get<DiscoverTVShowsResponse>(
      requests.discoverTVs
    );
    return res.data;
  };
