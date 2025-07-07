import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {PostsService} from '../../services/posts.service';
import {map} from 'rxjs';

@Component({
  selector: 'app-compare-users',
  templateUrl: './compare-users.component.html',
  styleUrl: './compare-users.component.scss',
  standalone: false
})
export class CompareUsersComponent implements OnInit {
  firstSelectedId: number = 0;
  secondSelectedId: number = 0;
  users: User[] = [];
  firstSelectedUser?: User;
  secondSelectedUser?: User;
  firstPostsCount: number = 0;
  secondPostsCount: number = 0;
  constructor(private _userService: UserService, private _postsService: PostsService) {

  }
  ngOnInit() {
    this._userService.loadAllUsers().subscribe(
      results => this.users = results
    )
  }

  onUserChanged() {
    if(this.firstSelectedId && this.secondSelectedId){
      this.firstSelectedUser = this.users.find(user => user.id === Number(this.firstSelectedId));
      this.secondSelectedUser = this.users.find(user => user.id === Number(this.secondSelectedId));
      this.fetchPosts(Number(this.firstSelectedId), 'first');
      this.fetchPosts(Number(this.secondSelectedId), 'second');
    }
  }

  fetchPosts(userId: number, flag: 'first' | 'second') {
    this._postsService.loadAllPosts().pipe(
      map(results => results.filter(post => post.userId === userId))
    ).subscribe(results => {
      if(flag === 'first') {
        this.firstPostsCount = results.length;
      } else {
        this.secondPostsCount = results.length;
      }
    })
  }


}
