import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpotifyService } from '@app/services/spotify.service';
import { User } from '@app/interfaces/user.model';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class UserCardComponent implements OnInit {

  sairIcone = faSignOutAlt;
  user: User = null;

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.user = this.spotifyService.user;
  }

  logOut() {
    this.spotifyService.logOut();
  }
}
