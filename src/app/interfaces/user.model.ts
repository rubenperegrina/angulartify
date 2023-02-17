export interface User {
    id: string,
    name: string,
    imageUrl: string
}

export function createSpotifyUserByUser(user: SpotifyApi.CurrentUsersProfileResponse): User{
    return {
      id: user.id,
      name: user.display_name,
      imageUrl: user.images.pop().url
    }
 }