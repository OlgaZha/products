import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {SortStateService} from '../../services/sort-state.service';
import {PageStateService} from '../../services/page-size.service';
import {PaginatorState} from '../../models/paginatorState.model';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  standalone: false
})
export class GenericTableComponent<T> implements AfterViewInit, OnChanges, OnInit {
  @Input() data: T[] = [];
  @Input() columns: (keyof T)[] = [];
  dataSource = new MatTableDataSource<T>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() displayedColumns: (keyof T | 'actions')[] = []
  currentPageSize = 0;
  constructor(private sortStateService: SortStateService, private pageSizeService: PageStateService) {
  }

  ngOnInit() {
    this.sortStateService.getSortState();
    this.pageSizeService.getPageState();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sortStateService.sortState$.subscribe(state => {
      this.sort.active = state.active;
      this.sort.direction = state.direction;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'] !== null) {
      this.dataSource.data = this.data;
    }
    this.pageSizeService.pageState$.subscribe(pageState => {
      this.paginator.pageSize = pageState.pageSize;
      this.paginator.pageIndex = pageState.pageIndex;
    })
  }

  get columnsToStringName(): string[] {
    return this.columns.map(name => name.toString())
  }

  onToggleEdit(entity: any) {
    entity.editing = !entity.editing;
    if(!entity.editing) {
      console.log(`${entity.name} was updated`)
    }
  }

  sortMat($event: Sort) {
    this.sortStateService.setSortState($event);
  }

  onPageChange(event: PageEvent) {
    let pageInfo: PaginatorState = {pageIndex: event.pageIndex, pageSize: event.pageSize};
    this.pageSizeService.setPageState(pageInfo);
  }

}
