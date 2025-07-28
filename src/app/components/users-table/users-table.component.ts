import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {PageSizeService} from '../../services/page-size.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
  standalone: false
})
export class UsersTableComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<User>();
  columnsToDisplay: string[] = ['id', 'name', 'email', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterColumn: keyof User = "name";
  currentPageSize = 0;
  constructor(private userService: UserService, private pageSizeService: PageSizeService) {
  }
  ngOnInit() {
    this.userService.loadAllUsers().subscribe(users => {
      this.dataSource.data = users
    })
    this.pageSizeService.getPageSize().subscribe(pageSize => {
      this.currentPageSize = pageSize;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = ((user, filterValue) => {
      let value = (user[this.filterColumn] ?? '').toString().toLowerCase();
      return value?.includes(filterValue);
      })
  }

  onFilterChanged(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
  }

  onPageChange(event: PageEvent) {
    if(event.pageSize !== this.currentPageSize) {
      this.onPageSizeChange(event.pageSize)
    }
  }

  onPageSizeChange(newSize: number) {
    this.currentPageSize = newSize;
    this.pageSizeService.setPageSize(newSize);
  }

  onToggleEdit(user: any) {
    user.editing = !user.editing;
    if(!user.editing) {
      console.log(`${user.name} was updated`)
    }
  }


}
