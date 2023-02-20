import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '@app/interfaces/artist.model';
import { SpotifyService } from '../../services/spotify.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class TopArtistComponent implements OnInit {
  topArtists: Artist[] = [];
  @Input() limit!: number;

  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getTopArtist();
  }

  async getTopArtist(limit?: number) {
    if (limit)
      this.limit = this.limit + limit;
    this.topArtists = await this.spotifyService.getTopArtist(this.limit);
  }
}