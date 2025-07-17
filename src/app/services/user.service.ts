import { Injectable } from '@angular/core';
import {Post, User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of, Subject, switchMap, combineLatest} from 'rxjs';

let users = [];
let API = 'https://jsonplaceholder.typicode.com/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  reloadUsers$ = new Subject<User[]>();
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
}
