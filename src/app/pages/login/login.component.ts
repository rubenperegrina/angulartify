import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LoginComponent implements OnInit {

  private authorizationService = inject(AuthorizationService);
  private router = inject(Router);

  ngOnInit(): void {
    this.verifyTokenUrlCallback();
  }

  verifyTokenUrlCallback() {
    const token = this.authorizationService.getTokenUrlCallback();
    if (!!token) {
      this.authorizationService.setAccessToken(token);
      this.router.navigate(['/player/home']);
    }
  }

  openLoginUrl() {
    window.location.href = this.authorizationService.getLoginUrl();
  }
}
