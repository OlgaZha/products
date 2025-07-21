import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  standalone: false
})
export class UsersTableComponent implements OnInit {
  dataSource = new MatTableDataSource<User>();
  columnsToDisplay: string[] = ['id', 'name', 'email'];
  constructor(private userService: UserService) {
  }
  ngOnInit() {
    this.userService.loadAllUsers().subscribe(users => {
      debugger
      this.dataSource.data = users
    })
  }
}
