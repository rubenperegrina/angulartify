import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '@app/interfaces/track.model';
import { SpotifyService } from '@app/services/spotify.service';

@Component({
  selector: 'app-saved-albums',
  templateUrl: './saved-albums.component.html',
  styleUrls: ['./saved-albums.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SavedAlbumsComponent implements OnInit {
  savedAlbums: Album[] = [];
  @Input() limit!: number;

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getMySavedAlbums();
  }

  async getMySavedAlbums(limit?: number) {
    if(limit)
    this.limit = this.limit+limit;
    this.savedAlbums = await this.spotifyService.getMySavedAlbums(this.limit)
  }
}
