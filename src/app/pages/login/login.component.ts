import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '@app/services/spotify.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoginComponent {

  private spotifyService = inject(SpotifyService);

  openLoginUrl() {
    window.location.href = this.spotifyService.getLoginUrl();
  }
}
