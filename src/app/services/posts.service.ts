import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Post} from '../models/user.model';
import {HttpClient} from '@angular/common/http';

let API_POSTS = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  loadAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(API_POSTS);
  }

  loadPost(id: number): Observable<Post> {
    return this.http.get<Post>(API_POSTS + '/' + id);
  }
}
