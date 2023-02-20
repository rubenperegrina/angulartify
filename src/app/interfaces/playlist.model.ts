import { Track } from "./track.model";

export interface Playlist {
  id: string,
  name: string,
  imageUrl: string,
  track?: Track[]
}

export function createSpotifyPlaylistByPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): Playlist {
  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.pop().url
  };
}

export function SpotifySinglePlaylistByPlaylist(playlist: SpotifyApi.SinglePlaylistResponse): Playlist {
  if (!playlist)
    return newPlaylist();

  return {
    id: playlist.id,
    name: playlist.name,
    imageUrl: playlist.images.shift().url,
    track: []
  }
}

export function newPlaylist(): Playlist {
  return {
    id: '',
    imageUrl: '',
    name: '',
    track: []
  }
}