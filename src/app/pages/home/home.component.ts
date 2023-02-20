import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Track, newTrack } from '@app/interfaces/track.model';
import { SpotifyService } from '@app/services/spotify.service';
import { PlayerService } from '@app/services/player.service';
import { TopArtistComponent } from '@app/components/top-artist/top-artist.component';
import { SavedAlbumsComponent } from '../../components/saved-albums/saved-albums.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TopArtistComponent, SavedAlbumsComponent],
})
export class HomeComponent implements OnInit, OnDestroy {

  tracks: Track[] = []
  actualTrack: Track = newTrack();
  subs: Subscription[] = [];
  playIcon = faPlay;

  private spotifyService = inject(SpotifyService);
  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getMySavedTracks();
    this.getActualTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMySavedTracks() {
    this.tracks = await this.spotifyService.getMySavedTracks(0, 10)
  }

  getActualTrack() {
    const sub = this.playerService.actualTrack.subscribe(track => {
      this.actualTrack = track;
    });

    this.subs.push(sub);
  }

  getArtists(track: Track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  async setActualTrack(track: Track) {
    await this.spotifyService.executeTrack(track.id);
    this.playerService.setActualTrack(track);
  }
}
