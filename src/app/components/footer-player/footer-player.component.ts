import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Music, newMusic } from '@app/interfaces/music.model';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-footer-player',
  templateUrl: './footer-player.component.html',
  styleUrls: ['./footer-player.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class FooterPlayerComponent implements OnInit, OnDestroy {

  music: Music = newMusic();
  subs: Subscription[] = []
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;

  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getActualMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getActualMusic() {
    const sub = this.playerService.actualMusic.subscribe(music => {
      this.music = music;
    });

    this.subs.push(sub);
  }

  previousMusic() {
    this.playerService.previousMusic();
  }

  nextMusic() {
    this.playerService.nextMusic();
  }
}
