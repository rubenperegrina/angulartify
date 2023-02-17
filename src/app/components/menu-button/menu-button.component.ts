import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class MenuButtonComponent {
  @Input() description = '';

  @Input() select = false;

  @Output() buttonClicked = new EventEmitter<void>();

  onClick() {
    this.buttonClicked.emit();
  }
}
