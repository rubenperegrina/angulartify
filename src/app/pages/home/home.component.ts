import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CommonModule, SidebarMenuComponent],
})
export class HomeComponent {

}
