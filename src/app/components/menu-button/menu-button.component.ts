import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.scss'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class MenuButtonComponent {
  @Input() description = '';
  @Input() imageUrl = '';
  @Input() icon: IconDefinition = undefined;
  @Input() select = false;
  @Output() buttonClicked = new EventEmitter<void>();

  onClick() {
    this.buttonClicked.emit();
  }
}
