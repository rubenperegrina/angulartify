import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Track, newTrack } from '@app/interfaces/track.model';
import { TopArtistComponent } from '@app/components/top-artist/top-artist.component';
import { SavedAlbumsComponent } from '../../components/saved-albums/saved-albums.component';
import { TrackService } from '../../services/track.service';

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

  private trackService = inject(TrackService);

  ngOnInit(): void {
    this.getMySavedTracks();
    this.getActualTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  async getMySavedTracks() {
    this.tracks = await this.trackService.getMySavedTracks(0, 10)
  }

  getActualTrack() {
    const sub = this.trackService.actualTrack.subscribe(track => {
      this.actualTrack = track;
    });

    this.subs.push(sub);
  }

  getArtists(track: Track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  async setActualTrack(track: Track) {
    await this.trackService.executeTrack(track.id);
    this.trackService.setActualTrack(track);
  }
}
