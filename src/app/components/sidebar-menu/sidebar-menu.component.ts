import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuButtonComponent } from '../menu-button/menu-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGuitar, faHome, faMusic, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { SpotifyService } from '@app/services/spotify.service';
import { Playlist } from '@app/interfaces/playlist';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, MenuButtonComponent, FontAwesomeModule, UserCardComponent],
})
export class SidebarMenuComponent implements OnInit {

  menuSelected = 'Home';
  playlists: Playlist[] = [];
  homeIcon = faHome;
  searchIcon = faSearch;
  artistsIcon = faGuitar;
  playlistIcon = faMusic;

  private router = inject(Router);
  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getPlaylists();
  }

  buttonClicked(button: string){
    this.menuSelected = button;
    this.router.navigateByUrl('/home');
  }

  goToPlaylist(playlistId: string){
    this.menuSelected = playlistId;
  }

  async getPlaylists(){
    this.playlists = await this.spotifyService.getPlaylistByUser();
  }
}
