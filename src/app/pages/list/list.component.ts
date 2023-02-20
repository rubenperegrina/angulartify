import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Music, newMusic } from '@app/interfaces/music.model';
import { SpotifyService } from '../../services/spotify.service';
import { PlayerService } from '../../services/player.service';
import { ActivatedRoute } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BannerComponent } from '../../components/banner/banner.component';

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
  musics: Music[] = [];
  actualMusic: Music = newMusic();
  playIcon = faPlay;
  title = '';
  subs: Subscription[] = []

  private activatedRoute = inject(ActivatedRoute);
  private spotifyService = inject(SpotifyService);
  private playerService = inject(PlayerService);

  ngOnInit(): void {
    this.getMusic();
    this.getActualMusic();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getActualMusic() {
    const sub = this.playerService.actualMusic.subscribe(music => {
      this.actualMusic = music;
    });

    this.subs.push(sub);
  }

  getMusic() {
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
    const playlistMusic = await this.spotifyService.getMusicByPlaylist(playlistId);
    this.setSecondPage(playlistMusic.name, playlistMusic.imageUrl, playlistMusic.musics);
    this.title = playlistMusic.name;
  }

  async getArtistData(artistId: string) {
    const artistMusic = await this.spotifyService.getMusicByArtist(artistId);
    this.setSecondPage(artistMusic.name, artistMusic.imageUrl);
    this.title = artistMusic.name;
  }

  setSecondPage(bannerText: string, bannerImage: string, musics?: Music[]) {
    this.bannerImageUrl = bannerImage;
    this.bannerText = bannerText;
    this.musics = musics;
  }

  getArtists(music: Music) {
    return music.artists.map(artist => artist.name).join(', ');
  }

  async executeMusic(music: Music) {
    await this.spotifyService.executeMusic(music.id);
    this.playerService.setActualMusic(music);
  }
}
