import { Injectable } from '@angular/core';
import { SpotifyAlbumForAlbum } from '@app/interfaces/album.model';
import { Album } from '@app/interfaces/track.model';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async getMySavedAlbums(limit = 5): Promise<Album[]> {
    const albums = await this.spotifyApi.getMySavedAlbums({ limit });
    return albums.items.map(x => SpotifyAlbumForAlbum(x.album));
  }
}
