import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Post} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

let API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  selectedUserId$ = new BehaviorSubject<number| null>(null)
  constructor(private http: HttpClient) { }

  loadAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(API_POSTS);
  }

  loadPost(id: number): Observable<Post> {
    return this.http.get<Post>(API_POSTS + '/' + id);
  }

  selectUserId(userId: number) {
    return this.selectedUserId$.next(userId);
  }
}
