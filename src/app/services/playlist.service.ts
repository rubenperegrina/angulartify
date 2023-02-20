import { inject, Injectable } from '@angular/core';
import { SpotifyTrackForTrack } from '@app/interfaces/track.model';
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

  async getTrackByPlaylist(playlistId: string, offset = 0, limit = 50) {
    const playlistSpotify = await this.spotifyApi.getPlaylist(playlistId);

    if (!playlistSpotify)
      return null;

    const playlist = SpotifySinglePlaylistByPlaylist(playlistSpotify);

    const tracksSpotify = await this.spotifyApi.getPlaylistTracks(playlistId, { offset, limit });
    playlist.track = tracksSpotify.items.map(track => SpotifyTrackForTrack(track.track as SpotifyApi.TrackObjectFull))

    return playlist;
  }
}
