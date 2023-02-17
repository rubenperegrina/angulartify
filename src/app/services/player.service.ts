import { inject, Injectable } from '@angular/core';
import { Music, newMusic } from '@app/interfaces/music.model';
import { BehaviorSubject } from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  actualMusic = new BehaviorSubject<Music>(newMusic());
  timerId: any = null;

  private spotifyService = inject(SpotifyService);
  constructor() {
    this.getActualMusic();
  }

  async getActualMusic() {
    clearTimeout(this.timerId);

    const music = await this.spotifyService.getActualMusic();
    this.setActualMusic(music);

    this.timerId = setInterval(async () => {
      await this.getActualMusic();
    }, 5000)
  }

  setActualMusic(music: Music) {
    this.actualMusic.next(music);
  }

  async previousMusic() {
    await this.spotifyService.previousMusic();
  }

  async nextMusic() {
    await this.spotifyService.nextMusic();
  }
}
