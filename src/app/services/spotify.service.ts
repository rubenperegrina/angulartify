import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { createSpotifyUserByUser, User } from '@app/interfaces/user.model';
import { Router } from '@angular/router';
import { Album, Track, SpotifyTrackForTrack } from '@app/interfaces/track.model';
import { SpotifyAlbumForAlbum } from '@app/interfaces/album.model';

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

  async getMySavedTracks(offset = 0, limit = 50): Promise<Track[]> {
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return tracks.items.map(x => SpotifyTrackForTrack(x.track));
  }

  async getMySavedAlbums(limit = 5): Promise<Album[]> {
    const albums = await this.spotifyApi.getMySavedAlbums({ limit });
    return albums.items.map(x => SpotifyAlbumForAlbum(x.album));
  }

  async executeTrack(trackId: string) {
    await this.spotifyApi.queue(trackId);
    await this.spotifyApi.skipToNext();
  }

  async getActualTrack(): Promise<Track> {
    const trackSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTrackForTrack(trackSpotify.item);
  }

  async previousTrack() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextTrack() {
    await this.spotifyApi.skipToNext();
  }
}
