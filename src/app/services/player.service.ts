import { inject, Injectable } from '@angular/core';
import { Track, newTrack } from '@app/interfaces/track.model';
import { BehaviorSubject } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  actualTrack = new BehaviorSubject<Track>(newTrack());
  timerId: any = null;

  private spotifyService = inject(SpotifyService);
  constructor() {
    this.getActualTrack();
  }

  async getActualTrack() {
    clearTimeout(this.timerId);

    const track = await this.spotifyService.getActualTrack();
    this.setActualTrack(track);

    this.timerId = setInterval(async () => {
      await this.getActualTrack();
    }, 5000)
  }

  setActualTrack(track: Track) {
    this.actualTrack.next(track);
  }

  async previousTrack() {
    await this.spotifyService.previousTrack();
  }

  async nextTrack() {
    await this.spotifyService.nextTrack();
  }
}
