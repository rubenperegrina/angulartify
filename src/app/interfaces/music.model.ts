import { addMilliseconds, format } from "date-fns";

export interface Music {
    id: string,
    title: string,
    artists: Artists[],
    album: Album,
    duration: string
}

export interface Album {
    id: string,
    name: string,
    imageUrl: string
}

export interface Artists {
    id: string,
    name: string
}

export function newMusic(): Music {
    return {
        id: '',
        album: {
            id: '',
            imageUrl: '',
            name: '',
        },
        artists: [],
        duration: '',
        title: ''
    }
}

export function SpotifyTrackForMusic(spotifyTrack: SpotifyApi.TrackObjectFull) : Music{
  
    if (!spotifyTrack)
      return newMusic();
  
    const msToMinutes = (ms: number) => {
      const data = addMilliseconds(new Date(0), ms);
      return format(data, 'mm:ss');
    }
    
    return {
      id: spotifyTrack.uri,
      title: spotifyTrack.name,
      album: {
        id: spotifyTrack.id,
        imageUrl: spotifyTrack.album.images.shift().url,
        name: spotifyTrack.album.name
      },
      artists: spotifyTrack.artists.map(artist => ({
        id: artist.id,
        name: artist.name
      })),
      duration: msToMinutes(spotifyTrack.duration_ms),
    }
  }