import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '@app/interfaces/track.model';
import { AlbumService } from '../../services/album.service';

@Component({
  selector: 'app-saved-albums',
  templateUrl: './saved-albums.component.html',
  styleUrls: ['./saved-albums.component.scss'],
  imports: [CommonModule],
  standalone: true,
})
export class SavedAlbumsComponent implements OnInit {
  savedAlbums: Album[] = [];
  @Input() limit = 5;

  private albumService = inject(AlbumService);

  ngOnInit(): void {
    this.getMySavedAlbums();
  }

  async getMySavedAlbums(limit?: number) {
    if (limit)
      this.limit = this.limit + limit;
    this.savedAlbums = await this.albumService.getMySavedAlbums(this.limit)
  }
}
