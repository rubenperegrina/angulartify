import { inject, Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { createSpotifyUserByUser, User } from '@app/interfaces/user.model';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  user: User;

  private authorizationService = inject(AuthorizationService);
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
      this.authorizationService.setAccessToken(token);
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
}
