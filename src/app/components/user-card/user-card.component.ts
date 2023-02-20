import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserService } from '@app/services/user.service';
import { User } from '@app/interfaces/user.model';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class UserCardComponent implements OnInit {

  sairIcone = faSignOutAlt;
  user: User = null;

  private userService = inject(UserService);
  private authorizationService = inject(AuthorizationService);

  ngOnInit(): void {
    this.user = this.userService.user;
  }

  logOut() {
    this.authorizationService.logOut();
  }
}
