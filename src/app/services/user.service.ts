import { Injectable } from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

let users = [];
let API = 'https://jsonplaceholder.typicode.com/users'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  constructor(private http: HttpClient) {}
  addUser(user: User) {
    users.push(user);
  }
  loadUser(id: number): Observable<User|null> {
    if(id) {
      return this.http.get<User>(API + id);
    }
    return of(null);
  }
  loadAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(API);
  }
  setUsers(users: User[]) {
    this.users = users;
  }
}
