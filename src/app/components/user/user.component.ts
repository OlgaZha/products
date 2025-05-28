import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements  OnInit {
  @Input() user: User = {} as User;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {

    }
}
