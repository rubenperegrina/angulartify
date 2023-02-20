import { Injectable } from '@angular/core';
import Spotify from 'spotify-web-api-js';
import { Artist, SpotifyArtistByArtist } from '@app/interfaces/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  spotifyApi: Spotify.SpotifyWebApiJs = null;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async getTopArtist(limit = 5): Promise<Artist[]> {
    const artists = await this.spotifyApi.getMyTopArtists({ limit });
    return artists.items.map(SpotifyArtistByArtist);
  }

  async getTrackByArtist(artistId: string) {
    const artistSpotify = await this.spotifyApi.getArtist(artistId);
    if (!artistSpotify)
      return null;

    const artist = SpotifyArtistByArtist(artistSpotify);
    return artist;
  }
}
