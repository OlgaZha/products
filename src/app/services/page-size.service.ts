import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {SortState} from '../models/sortState.model';
import {PaginatorState} from '../models/paginatorState.model';

@Injectable({
  providedIn: 'root'
})
export class PageStateService {
  pageSize$ = new ReplaySubject<number>(1);
  pageState = new BehaviorSubject<PaginatorState>({pageIndex: 0,  pageSize: 5});
  pageState$ = this.pageState.asObservable();
  localStoragePaginatorName = 'matTablePaginatorKey';
  constructor() {
    const currentState = localStorage.getItem(this.localStoragePaginatorName)
    if(currentState) {
      this.pageState.next(JSON.parse(currentState));
    }
  }

  setPageState(pageState: PaginatorState): void {
    this.pageState.next(pageState);
    localStorage.setItem(this.localStoragePaginatorName, JSON.stringify(pageState));
  }
  getPageState() {
    let paginatorState = localStorage.getItem(this.localStoragePaginatorName);
    if(paginatorState) {
      this.setPageState(JSON.parse(paginatorState))
    }
  }
}
