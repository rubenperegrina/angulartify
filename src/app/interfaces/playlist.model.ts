import { Music } from "./music.model";

export interface Playlist {
    id: string,
    name: string,
    imageUrl: string,
    musics?: Music[]
}

export function createSpotifyPlaylistByPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist{
    return {
      id: playlist.id,
      name: playlist.name,
      imageUrl: playlist.images.pop().url
    };
  }