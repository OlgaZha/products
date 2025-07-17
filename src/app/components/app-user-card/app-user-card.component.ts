import {Component, Input, TemplateRef} from '@angular/core';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './app-user-card.component.html',
  styleUrl: './app-user-card.component.scss',
  standalone: false
})
export class AppUserCardComponent {
  @Input() user!: User;
  @Input() template!: TemplateRef<any>;
}
