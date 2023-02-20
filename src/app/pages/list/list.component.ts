import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Track, newTrack } from '@app/interfaces/track.model';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from '../../components/banner/banner.component';
import { ArtistService } from '../../services/artist.service';
import { PlaylistService } from '../../services/playlist.service';
import { TrackService } from '../../services/track.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, BannerComponent],
})
export class ListComponent implements OnInit, OnDestroy {

  bannerImageUrl = '';
  bannerText = '';
  tracks: Track[] = [];
  actualTrack: Track = newTrack();
  playIcon = faPlay;
  title = '';
  subs: Subscription[] = []

  private activatedRoute = inject(ActivatedRoute);
  private artistService = inject(ArtistService);
  private playlistService = inject(PlaylistService);
  private trackService = inject(TrackService);

  ngOnInit(): void {
    this.getTrack();
    this.getActualTrack();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getActualTrack() {
    const sub = this.trackService.actualTrack.subscribe(track => {
      this.actualTrack = track;
    });

    this.subs.push(sub);
  }

  getTrack() {
    const sub = this.activatedRoute.paramMap
      .subscribe(async params => {
        const type = params.get('type');
        const id = params.get('id');
        await this.getSecondPage(type, id);
      });

    this.subs.push(sub);
  }

  async getSecondPage(type: string, id: string) {
    if (type === 'playlist') {
      await this.getPlaylistData(id);
    }
    if (type === 'artist') {
      await this.getArtistData(id);
    }
  }

  async getPlaylistData(playlistId: string) {
    const playlistTrack = await this.playlistService.getTrackByPlaylist(playlistId);
    this.setSecondPage(playlistTrack.name, playlistTrack.imageUrl, playlistTrack.track);
    this.title = playlistTrack.name;
  }

  async getArtistData(artistId: string) {
    const artistTrack = await this.artistService.getTrackByArtist(artistId);
    this.setSecondPage(artistTrack.name, artistTrack.imageUrl);
    this.title = artistTrack.name;
  }

  setSecondPage(bannerText: string, bannerImage: string, tracks?: Track[]) {
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.tracks = tracks;
  }

  getArtists(track: Track) {
    return track.artists.map(artist => artist.name).join(', ');
  }

  async executeTrack(track: Track) {
    await this.trackService.executeTrack(track.id);
    this.trackService.setActualTrack(track);
  }
}
