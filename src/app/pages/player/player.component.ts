import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from '../../components/sidebar-menu/sidebar-menu.component';
import { RouterModule } from '@angular/router';
import { FooterPlayerComponent } from '../../components/footer-player/footer-player.component';

@Component({
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarMenuComponent, FooterPlayerComponent],
})
export class playerComponent {

}