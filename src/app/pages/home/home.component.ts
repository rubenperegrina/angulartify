import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Music, newMusic } from '@app/interfaces/music.model';
import { SpotifyService } from '@app/services/spotify.service';
import { PlayerService } from '@app/services/player.service';
import { TopArtistComponent } from '@app/components/top-artist/top-artist.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TopArtistComponent],
})
export class HomeComponent implements OnInit, OnDestroy {

  musics: Music[] = []
  actualMusic: Music = newMusic();
  subs: Subscription[] = [];
  playIcon = faPlay;

  private spotifyService = inject(SpotifyService);
  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getMySavedTracks();
    this.getActualMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMySavedTracks() {
    this.musics = await this.spotifyService.getMySavedTracks(0, 10)
  }

  getActualMusic() {
    const sub = this.playerService.actualMusic.subscribe(music => {
      this.actualMusic = music;
    });

    this.subs.push(sub);
  }

  getArtists(music: Music) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async setActualMusic(music: Music) {
    await this.spotifyService.executeMusic(music.id);
    this.playerService.setActualMusic(music);
  }
}
