import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { RouterModule } from '@angular/router';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarMenuComponent],
})
export class playerComponent {

}