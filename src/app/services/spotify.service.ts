import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  authEndpoint: string = `${environment.authEndpoint}?`;
  clientId: string = `client_id=${environment.clientId}&`;
  redirectUrl: string = `redirect_uri=${environment.redirectUrl}&`;
  scopes: string = `scope=${environment.scopes.join('%20')}&`;
  responseType: string = `response_type=token&show_dialog=true`;

  getLoginUrl(): string {
    return this.authEndpoint + this.clientId + this.redirectUrl + this.scopes + this.responseType;
  }
}
