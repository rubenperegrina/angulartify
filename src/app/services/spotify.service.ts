import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { createSpotifyUserByUser, User } from '@app/interfaces/user.model';
import { Router } from '@angular/router';
import { createSpotifyPlaylistByPlaylist, Playlist, SpotifySinglePlaylistByPlaylist } from '@app/interfaces/playlist.model';
import { Music, SpotifyTrackForMusic } from '@app/interfaces/music.model';
import { Artist, SpotifyArtistByArtist } from '@app/interfaces/artist.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: User;
  authEndpoint = `${environment.authEndpoint}?`;
  clientId = `client_id=${environment.clientId}&`;
  redirectUrl = `redirect_uri=${environment.redirectUrl}&`;
  scopes = `scope=${environment.scopes.join('%20')}&`;
  responseType = `response_type=token&show_dialog=true`;

  private router = inject(Router);
  constructor() {
    this.spotifyApi = new Spotify();
  }

  async initUser() {
    if (!!this.user)
      return true;
    const token = localStorage.getItem('token');
    if (!token)
      return false;
    try {
      this.setAccessToken(token);
      await this.getSpotifyUser();
      return !!this.user;

    } catch (ex) {
      return false;
    }
  }

  async getSpotifyUser() {
    const userInfo = await this.spotifyApi.getMe();
    this.user = createSpotifyUserByUser(userInfo);
  }

  getLoginUrl(): string {
    return this.authEndpoint + this.clientId + this.redirectUrl + this.scopes + this.responseType;
  }

  getTokenUrlCallback(): string {
    if (!window.location.hash)
      return '';

    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  setAccessToken(token: string) {
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    if (!token) {
      this.logOut();
      return false;
    }
    return true;
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async getTopArtist(limit = 5): Promise<Artist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistByArtist);
  }

  async getMySavedTracks(offset = 0, limit = 50): Promise<Music[]> {
    const musics = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return musics.items.map(x => SpotifyTrackForMusic(x.track));
  }

  async getPlaylistByUser(offset = 0, limit = 50): Promise<Playlist[]> {
    const playlists = await this.spotifyApi.getUserPlaylists(this.user.id, { offset, limit });
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

  async executeMusic(musicId: string) {
    await this.spotifyApi.queue(musicId);
    await this.spotifyApi.skipToNext();
  }

  async getActualMusic(): Promise<Music> {
    const musicSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackForMusic(musicSpotify.item);
  }

  async previousMusic() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextMusic() {
    await this.spotifyApi.skipToNext();
  }
}
