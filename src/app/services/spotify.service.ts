import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { User } from '@app/interfaces/user.model';
import { Router } from '@angular/router';

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
}
