import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrl: './table-filter.component.scss',
  standalone: false
})
export class TableFilterComponent {
  @Output() filterChanged = new EventEmitter<string>();
  onInput(event: Event) {
    this.filterChanged.emit((event.target as HTMLInputElement)?.value)
  }
}
