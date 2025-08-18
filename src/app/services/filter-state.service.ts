import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SortState} from '../models/sortState.model';

@Injectable({
  providedIn: 'root'
})
export class FilterStateService {
  filterState = new BehaviorSubject<string>('');
  filterState$ = this.filterState.asObservable();
  localStorageFilterName = 'matTableFilterKey';

  constructor() { }

  setFilteredState(filter: string) {
    this.filterState.next(filter);
    localStorage.setItem(this.localStorageFilterName, JSON.stringify(filter));
  }

  getFilteredState() {
    let localStorageState = localStorage.getItem(this.localStorageFilterName);
    if(localStorageState) {
      this.setFilteredState(JSON.parse(localStorageState))
    }
  }
}
