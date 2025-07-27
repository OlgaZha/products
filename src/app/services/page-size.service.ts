import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageSizeService {
  pageSize$ = new ReplaySubject<number>(1);

  constructor() {
    this.setPageSize(5)
  }

  setPageSize(pageSize: number): void {
    this.pageSize$.next(pageSize);
  }
  getPageSize(): Observable<number> {
    return this.pageSize$.asObservable()
  }
}
