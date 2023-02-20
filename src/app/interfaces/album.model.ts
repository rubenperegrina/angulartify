import { Artist } from "./artist.model";

export interface Album {
    artists: Artist[];
    imageUrl: string,
    name: string;
    id: string;
}

export function newAlbum(): Album {
    return {
        artists: [],
        imageUrl: '',
        name: '',
        id: ''
    };
}

export function SpotifyAlbumForAlbum(spotifyTAlbum: SpotifyApi.AlbumObjectFull): Album {

    if (!spotifyTAlbum)
        return newAlbum();
    return {
        id: spotifyTAlbum.uri,
        artists: spotifyTAlbum.artists.map(artist => ({
            id: artist.id,
            name: artist.name,
        })),
        name: spotifyTAlbum.name,
        imageUrl: spotifyTAlbum.images.sort((a, b) => a.width - b.width).pop().url,
    }
}