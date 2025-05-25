import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements  OnInit {
  user: User = {} as User;
  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
        this.getUser()
    }

  getUser(){
    this.userService.getUser(1).subscribe(user => {this.user = user});
  }
}
