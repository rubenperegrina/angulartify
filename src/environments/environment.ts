export const environment = {
  production: false,
  clientId: '848de96d5a4e461eaa84cc17e3168414',
  authEndpoint: 'https://accounts.spotify.com/authorize',
  redirectUrl: 'http://localhost:4200/login/',
  scopes: [
    "user-read-currently-playing", // música reproduciendose ahora.
    "user-read-recently-played", // leer música reproducida recientemente
    "user-read-playback-state", // leer estado reproductor de usuario
    "user-top-read", // top artistas del usuario
    "user-modify-playback-state", // modificar reproducor de usuario.
    "user-library-read", // leer biblioteca de usuario
    "playlist-read-private", // leer playlists privadas
    "playlist-read-collaborative" // leer playlists colaborativas
  ]
}