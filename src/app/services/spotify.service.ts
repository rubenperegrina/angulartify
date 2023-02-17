import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import Spotify from 'spotify-web-api-js';
import { User } from '@app/interfaces/user.model';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: User;
  authEndpoint: string = `${environment.authEndpoint}?`;
  clientId: string = `client_id=${environment.clientId}&`;
  redirectUrl: string = `redirect_uri=${environment.redirectUrl}&`;
  scopes: string = `scope=${environment.scopes.join('%20')}&`;
  responseType: string = `response_type=token&show_dialog=true`;

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

  setAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
  }
}
