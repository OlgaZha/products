import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {SortState} from '../models/sortState.model';

@Injectable({
  providedIn: 'root'
})
export class SortStateService {
  sortState = new BehaviorSubject<SortState>({active: '', direction: ''});
  sortState$ = this.sortState.asObservable();
  localStorageSortName = 'matTableSortKey';

  constructor() { }

  setSortState(stateSort: SortState) {
    this.sortState.next(stateSort);
    localStorage.setItem(this.localStorageSortName, JSON.stringify(stateSort));
  }

  getSortState() {
    let localStorageState = localStorage.getItem(this.localStorageSortName);
    if(localStorageState) {
      this.setSortState(JSON.parse(localStorageState))
    }
  }

}
