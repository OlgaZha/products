import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {PageStateService} from '../../services/page-size.service';
import {SortStateService} from '../../services/sort-state.service';

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
  users: User[] = [];
  columns: string[] = ['id', 'name', 'email'];
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  constructor(private userService: UserService, private pageSizeService: PageStateService, private sortStateService: SortStateService) {
  }
  ngOnInit() {
    this.userService.loadAllUsers().subscribe(users => {
      this.users = users
    })
    // this.pageSizeService.getPageSize().subscribe(pageSize => {
    //   this.currentPageSize = pageSize;
    // })
    this.sortStateService.getSortState();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = ((user, filterValue) => {
      let value = (user[this.filterColumn] ?? '').toString().toLowerCase();
      return value?.includes(filterValue);
      })
    this.sortStateService.sortState$.subscribe(state => {
      // this.sort.active = state.active;
      // this.sort.direction = state.direction;
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
    // this.pageSizeService.setPageSize(newSize);
  }

  onToggleEdit(user: any) {
    user.editing = !user.editing;
    if(!user.editing) {
      console.log(`${user.name} was updated`);
    }
  }

  // sortMat($event: Sort) {
  //   this.sortStateService.setSortState($event);
  // }
}
