import {AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrl: './generic-table.component.scss',
  standalone: false
})
export class GenericTableComponent<T> implements AfterViewInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: (keyof T)[] = [];
  dataSource = new MatTableDataSource<T>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() displayedColumns: (keyof T | 'actions')[] = []

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data'] !== null) {
      this.dataSource.data = this.data;
    }
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
}
