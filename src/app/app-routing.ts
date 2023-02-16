import { enableProdMode } from '@angular/core';
import { Routes } from '@angular/router';
import { environment } from 'src/environments/environment';

export const routes: Routes = [];

if(environment.production) {
  enableProdMode();
}
