import { Injectable } from '@angular/core';
import {Post, User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {forkJoin, Observable, of} from 'rxjs';

let users = [];
let API = 'https://jsonplaceholder.typicode.com/users'
let API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

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
  loadAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(API_POSTS);
  }

  setUsers(users: User[]) {
    this.users = users;
  }
  getUsersByIds(ids:number[]): Observable<User[]> {
    const requests = ids.map(id => this.http.get<User>(API + '/' + id));
    return forkJoin(requests);
  }

}
