import { inject, Injectable } from '@angular/core';
import { SpotifyTrackForMusic } from '@app/interfaces/music.model';
import Spotify from 'spotify-web-api-js';
import { createSpotifyPlaylistByPlaylist, Playlist, SpotifySinglePlaylistByPlaylist } from '@app/interfaces/playlist.model';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;

  private spotifyService = inject(SpotifyService);
  constructor() {
    this.spotifyApi = new Spotify();
  }

  async getPlaylistByUser(offset = 0, limit = 50): Promise<Playlist[]> {
    const userId = this.spotifyService.user.id;
    const playlists = await this.spotifyApi.getUserPlaylists(userId, { offset, limit });
    return playlists.items.map(createSpotifyPlaylistByPlaylist);
  }

  async getMusicByPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistByPlaylist(playlistSpotify);

    const musicsSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.musics = musicsSpotify.items.map(music => SpotifyTrackForMusic(music.track as SpotifyApi.TrackObjectFull))

    return playlist;
  }
}
