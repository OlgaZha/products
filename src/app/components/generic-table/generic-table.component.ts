import {AfterViewInit, Component, input, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {SortStateService} from '../../services/sort-state.service';
import {PageStateService} from '../../services/page-size.service';
import {PaginatorState} from '../../models/paginatorState.model';
import {FilterStateService} from '../../services/filter-state.service';

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
  @Input() displayedColumns: (keyof T | 'actions')[] = [];
  @Input() filteredColumn!: keyof T;
  currentPageSize = 0;
  constructor(private sortStateService: SortStateService, private pageSizeService: PageStateService, private filterStateService: FilterStateService) {
  }

  ngOnInit() {
    this.sortStateService.getSortState();
    this.pageSizeService.getPageState();
    this.filterStateService.filterState$.subscribe(filterState => this.dataSource.filter = filterState);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.sortStateService.sortState$.subscribe(state => {
      this.sort.active = state.active;
      this.sort.direction = state.direction;
    })
    this.applyPaginatorState();
    // this.dataSource.filterPredicate = ((data, filterValue) => {
    //   let value = (data[this.filteredColumn] ?? '').toString().toLowerCase();
    //   return value?.includes(filterValue);
    // })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'] && this.data?.length) {
      this.dataSource.data = this.data;
      this.onFilterChanged(this.filterStateService.getFilteredState())
    }
    this.applyPaginatorState();
    // this.pageSizeService.pageState$.subscribe(pageState => {
    //   this.paginator.pageSize = pageState.pageSize;
    //   this.paginator.pageIndex = pageState.pageIndex;
    // })
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

  onFilterChanged(filterValue: string) {
    this.dataSource.filter = filterValue.toLowerCase();
    this.filterStateService.setFilteredState(filterValue);
  }

  private applyPaginatorState() {
    setTimeout(() =>
      this.pageSizeService.pageState$.subscribe(page => {
        this.paginator.pageSize = page.pageSize;
        this.paginator.pageIndex = page.pageIndex;
        this.dataSource._updateChangeSubscription();
      })
    )
  }

  clearLocalStorage () {
    this.pageSizeService.removePaginatorFromLocalStorage();
    this.filterStateService.removeFilterFromLocalStorage();
    this.sortStateService.removeSortingFromLocalStorage();
  }

}
