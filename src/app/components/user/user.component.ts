import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements  OnInit {
  @Input() user: User = {} as User;
  @Input() isSelected: boolean = false;
  constructor() {
  }

  ngOnInit(): void {

    }
}
