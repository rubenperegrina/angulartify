import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist } from '@app/interfaces/artist.model';
import { RouterModule } from '@angular/router';
import { ArtistService } from '@app/services/artist.service';

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

  private artistService = inject(ArtistService);

  ngOnInit(): void {
    this.getTopArtist();
  }

  async getTopArtist(limit?: number) {
    if (limit)
      this.limit = this.limit + limit;
    this.topArtists = await this.artistService.getTopArtist(this.limit);
  }
}