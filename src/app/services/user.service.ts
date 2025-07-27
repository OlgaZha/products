import { Injectable } from '@angular/core';
import {Post, User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {
  forkJoin,
  Observable,
  of,
  Subject,
  switchMap,
  startWith,
  debounceTime,
  map,
  ReplaySubject, tap, BehaviorSubject
} from 'rxjs';

let users = [];
let API = 'https://jsonplaceholder.typicode.com/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  refreshTrigger$ = new Subject<void>();
  users$: Observable<User[]> = this.refreshTrigger$.pipe(
    startWith(undefined),
    switchMap(() => {
      return this.loadAllUsers()
      })
    )
  searchValue$ = new Subject<string>();
  cacheUsers$ = new ReplaySubject<User[]>(1);
  isUsersLoaded: boolean = false;
  sortTypeSubject = new BehaviorSubject<'price'|'name'>('price');
  sortType$ = this.sortTypeSubject.asObservable();

  constructor(private http: HttpClient) {}
  addUser(user: User) {
    users.push(user);
  }
  loadUser(id: number): Observable<User|null> {
    if(id) {
      return this.http.get<User>(API + '/' + id);
    }
    return of(null);
  }
  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API);
  }

  setUsers(users: User[]) {
    this.users = users;
  }
  getUsersByIds(ids:number[]): Observable<User[]> {
    const requests = ids.map(id => this.http.get<User>(API + '/' + id));
    return forkJoin(requests);
  }
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(API + '/' + user.id, user);
  }
  refreshUsers(): void {
    this.refreshTrigger$.next()
  }
  getFilteredUsers(): Observable<User[]> {
    return this.searchValue$.pipe(
      debounceTime(500),
      switchMap(value => {
        return this.loadAllUsers().pipe(
          map(users => users.filter(user => user.name.toLowerCase().includes(value.toLowerCase())))
        )
      })
    )
  }

  searchUsers(value: string) {
    return this.searchValue$.next(value)
  }

  loadUsersWithCache() {
    if(!this.isUsersLoaded) {
      return this.loadAllUsers().pipe(
        tap(users => {
          this.cacheUsers$.next(users);
          this.isUsersLoaded = true;
        })
      )
    } else {
      console.log('Users are already loaded')
      return this.cacheUsers$.asObservable();
    }
  }

  getUsersLazy() {
    return this.loadUsersWithCache();
  }

  setSortType(type: 'price' | 'name') {
    this.sortTypeSubject.next(type);
  }

}
