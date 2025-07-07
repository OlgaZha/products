import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {map, Observable, startWith, combineLatest, switchMap} from 'rxjs';
import {Post, User} from '../../models/user.model';
import {FormControl} from '@angular/forms';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  standalone: false
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  filteredPosts$!: Observable<Post[]>;
  informControl: FormControl = new FormControl('');
  selectPostControl: FormControl = new FormControl('');
  selectedPost!: Observable<Post>;
  selectedUser!: Observable<User | undefined>;
constructor(private _postsService: PostsService, private _userService: UserService) {

}
  ngOnInit() {
  this.posts$ = this._postsService.loadAllPosts()
    this.filteredPosts$ = combineLatest([this.posts$, this.informControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([posts, informControl]) => {
        return posts.filter(post => post.title.toUpperCase().includes(informControl.toUpperCase()))
      }),
    )
    this.onSelectPost()
    this.displayUserInfo()
  }

  onSelectPost(){
    this.selectedPost = this.selectPostControl.valueChanges.pipe(
      startWith(''),
      switchMap(id => this._postsService.loadPost(id))
    )
  }

  displayUserInfo() {
     this.selectedUser = combineLatest([
      this.selectPostControl.valueChanges.pipe(startWith('')),
      this.posts$,
      this._userService.loadAllUsers()
    ]).pipe(
      map(([selectedPostId, posts, users]) => {
        const post = posts.find(p => p.id === +selectedPostId);
        return users.find(u => u.id === post?.userId)
      })
    )
  }

  clearSelection() {
  this.selectPostControl.setValue('')
  }
}
