import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Album } from '@app/interfaces/track.model';
import { UserService } from '../../services/user.service';

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

  private userService = inject(UserService);

  ngOnInit(): void {
    this.getMySavedAlbums();
  }

  async getMySavedAlbums(limit?: number) {
    if (limit)
      this.limit = this.limit + limit;
    this.savedAlbums = await this.userService.getMySavedAlbums(this.limit)
  }
}
