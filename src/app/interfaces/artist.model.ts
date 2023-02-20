import { Track } from "./track.model";

export interface Artist {
    id: string,
    name: string,
    imageUrl?: string,
    track?: Track[]
}

export function newArtist(): Artist {
    return {
        id: '',
        imageUrl: '',
        name: '',
        track: []
    };
}

export function SpotifyArtistByArtist(spotifyArtist: SpotifyApi.ArtistObjectFull): Artist {
    return {
        id: spotifyArtist.id,
        imageUrl: spotifyArtist.images.sort((a, b) => a.width - b.width).pop().url,
        name: spotifyArtist.name
    };
}