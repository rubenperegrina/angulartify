import { inject, Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { createSpotifyUserByUser, User } from '@app/interfaces/user.model';
import { Router } from '@angular/router';
import { Album } from '@app/interfaces/track.model';
import { SpotifyAlbumForAlbum } from '@app/interfaces/album.model';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

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

  async getMySavedAlbums(limit = 5): Promise<Album[]> {
    const albums = await this.spotifyApi.getMySavedAlbums({ limit });
    return albums.items.map(x => SpotifyAlbumForAlbum(x.album));
  }
}
