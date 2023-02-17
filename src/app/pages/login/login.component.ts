import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '@app/services/spotify.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoginComponent implements OnInit {

  private spotifyService = inject(SpotifyService);
  private router = inject(Router);

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  verifyTokenUrlCallback() {
    const token = this.spotifyService.getTokenUrlCallback();
    if(!!token){
      this.spotifyService.setAccessToken(token);
      this.router.navigate(['/home']);
    }
  }


  openLoginUrl() {
    window.location.href = this.spotifyService.getLoginUrl();
  }
}
