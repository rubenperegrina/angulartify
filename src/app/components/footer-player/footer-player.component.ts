import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Track, newTrack } from '@app/interfaces/track.model';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-footer-player',
  templateUrl: './footer-player.component.html',
  styleUrls: ['./footer-player.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class FooterPlayerComponent implements OnInit, OnDestroy {

  track: Track = newTrack();
  subs: Subscription[] = []
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;

  private trackService = inject(TrackService);

  ngOnInit(): void {
    this.getActualTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getActualTrack() {
    const sub = this.trackService.actualTrack.subscribe(track => {
      this.track = track;
    });

    this.subs.push(sub);
  }

  previousTrack() {
    this.trackService.previousTrack();
  }

  nextTrack() {
    this.trackService.nextTrack();
  }
}
