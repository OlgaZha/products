import {Component, OnInit} from '@angular/core';
import {PostsService} from '../../services/posts.service';
import {map, Observable, startWith, combineLatest, switchMap, of} from 'rxjs';
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
  selectedUser!: Observable<User | null>;
  toggle: boolean = false;
  searchValue: string = "";
  selectNumberOfPosts: FormControl = new FormControl(0);
  filteredByValue$!: Observable<Post[]>;
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
    this.selectedPosts()
  }

  onSelectPost(){
    this.selectedPost = this.selectPostControl.valueChanges.pipe(
      startWith(''),
      switchMap(id => {
        return this._postsService.loadPost(id)})
    )
  }

  displayUserInfo() {
     this.selectedUser = this.selectedPost.pipe(
      switchMap(post => this._userService.loadUser(post.userId))
    )
  }

  clearSelection() {
  this.selectPostControl.setValue('')
  }

  selectedPosts() {
    this.filteredByValue$ = combineLatest([
      this.posts$,
      this.selectNumberOfPosts.valueChanges.pipe(startWith(1))
    ]).pipe(
      map(([posts, value]) => {
        return posts.slice(0, value-1)
      })
    )
  }
}
