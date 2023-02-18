import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Artist, newArtist } from '@app/interfaces/artist.model';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-top-artist',
  templateUrl: './top-artist.component.html',
  styleUrls: ['./top-artist.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class TopArtistComponent implements OnInit {
  topArtist: Artist = newArtist();
  
  private spotifyService = inject(SpotifyService);

  ngOnInit(): void {
    this.getTopArtist();
  }

  async getTopArtist(){
    const artists = await this.spotifyService.getTopArtist(1);
    
    if (!!artists)
      this.topArtist = artists.pop();
  }
}