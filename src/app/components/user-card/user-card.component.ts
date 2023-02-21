import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '@app/services/user.service';
import { User } from '@app/interfaces/user.model';
import { faSignOutAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class UserCardComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faSun = faSun;
  faMoon = faMoon;
  user: User = null;
  darkMode = false;

  private userService = inject(UserService);
  private authorizationService = inject(AuthorizationService);

  ngOnInit(): void {
    this.user = this.userService.user;
    this.detectColorScheme();
  }

  logOut() {
    this.authorizationService.logOut();
  }

  detectColorScheme() {
    if (window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches) {
      this.darkMode = true;
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
    }
  }

  toggleDarkTheme() {
    this.darkMode = !this.darkMode;
    document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
  }
}
