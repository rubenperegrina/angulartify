import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopArtistComponent } from '../../components/top-artist/top-artist.component';
import { SavedAlbumsComponent } from '../../components/saved-albums/saved-albums.component';

@Component({
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  standalone: true,
  imports: [CommonModule, TopArtistComponent, SavedAlbumsComponent],
})
export class LibraryComponent {
  savedAlbumsLimit = 14;
  topArtistsLimit = 14;
}
