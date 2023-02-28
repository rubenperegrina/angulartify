import { Injectable } from '@angular/core';
import { Track, SpotifyTrackForTrack, newTrack } from '@app/interfaces/track.model';
import { BehaviorSubject } from 'rxjs';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  spotifyApi: Spotify.SpotifyWebApiJs = null;
  actualTrack = new BehaviorSubject<Track>(newTrack());
  timerId: any = null;

  constructor() {
    this.spotifyApi = new Spotify();
    this.getActualTrack();
  }

  async getMySavedTracks(offset = 0, limit = 50): Promise<Track[]> {
    const tracks = await this.spotifyApi.getMySavedTracks({ offset, limit });
    return tracks.items.map(x => SpotifyTrackForTrack(x.track));
  }

  async executeTrack(trackId: string) {
    await this.spotifyApi.queue(trackId);
    await this.spotifyApi.skipToNext();
  }


  async getActualTrack() {
    clearTimeout(this.timerId);

    const trackSpotify = await this.spotifyApi.getMyCurrentPlayingTrack();
    const track = SpotifyTrackForTrack(trackSpotify.item);
    this.setActualTrack(track);

    this.timerId = setInterval(async () => {
      await this.getActualTrack();
    }, 5000)
  }

  setActualTrack(track: Track) {
    this.actualTrack.next(track);
  }

  async previousTrack() {
    await this.spotifyApi.skipToPrevious();
  }

  async nextTrack() {
    await this.spotifyApi.skipToNext();
  }

  async pauseTrack() {
    await this.spotifyApi.pause();
  }

  async playTrack() {
    await this.spotifyApi.play();
  }
}
