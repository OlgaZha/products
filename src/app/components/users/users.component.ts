import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/logger.service';
import {
  combineLatest,
  concat, concatMap,
  debounceTime,
  distinctUntilChanged,
  filter, forkJoin, from,
  map, merge, mergeMap,
  Observable,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: false
})
export class UsersComponent implements  OnInit {
  companyControl = new FormControl('');
  cityControl = new FormControl('');
  users$!: Observable<User[]>;
  companies$!: Observable<any[]>;
  cities$!: Observable<any[]>;
  newUser ={
    name: '',
    username: '',
    email: '',
    phone: '',
}
  form: FormGroup;
  users: User[] = [];
  defaultId = 1;
  filteredUsers: User[] = [];
  result: string = '';
  searchControl:any = new FormControl('');
  constructor(private userService: UserService, private fb: FormBuilder, private _loggerService: LoggerService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      jobs: this.fb.array([this.fb.control('', [Validators.required])])
    })
  }

  get jobs(): FormArray {
    return (this.form.get('jobs') as FormArray)
  }

  addJobs() {
    (this.form.get('jobs') as FormArray).push(this.fb.control('', Validators.required))
  }

  addUser() {
    if(this.form.valid) {
      if(this.form.controls['name'].value &&
        this.form.controls['username'].value &&
        this.form.controls['email'].value &&
        this.form.controls['phone'].value
      ) {
        let newUser = {
          name: this.form.controls['name'].value,
          username: this.form.controls['username'].value,
          email: this.form.controls['email'].value,
          phone: this.form.controls['phone'].value,
          id: this.defaultId++
        }
        this.users.push(newUser);
        this.form.reset();
        this.jobs.clear();
        this._loggerService.logs.push(`User added product: ${this.addUser.name}`);
      }
    }
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.companyControl.setValue('', { emitEvent: true });
    this.cityControl.setValue('', { emitEvent: true });
    // this.getUsersById();
    // this.useConcatOperator();
    // this.useCombineLatest();
    this.users$ = this.userService.loadAllUsers();
    this.companies$ = this.users$.pipe(
      map(users => [...new Set(users.map(user => user.company?.name))])
    )
    this.cities$ = this.users$.pipe(
      map(users => [...new Set(users.map(user => user.address?.city))])
    )
    // this.useCombineLatestWithCompanyAndCity();
    // this.useMerge();
    // this.useConcatMap();
    this.getFullName();
    this.useMergeMap();
    this.compareUsers(1,2)
    this.searchControl.valueChanges.pipe(
      filter((searchValue: string | null) => !!searchValue && searchValue.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      map((searchValue: string) => {
        if(!searchValue && searchValue?.length < 3) {
          return this.users;
        }
        const filteredValue =  this.users.filter(user => user.name.toLowerCase().includes(searchValue))
        return filteredValue.length > 0 ? filteredValue : []
      }),
    ).subscribe((results: any[]) => {
      this.filteredUsers = results;
    })
    }
  getAllUsers(): void {
    this.userService.loadAllUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

  getUsersById(): void {
    this.userService.loadAllUsers().pipe(
      map((users: User[]) => {
        const filter1 = users.filter(user => user.id! > 0 && user.id! <= 5);
        const filter2 = users.filter(user => user.id! > 5 && user.id! <= 10);
        return [...filter1, ...filter2];
      }
      )
    ).subscribe(users => {
      console.log(users)});
  }

  useConcatOperator(): void {
    const obs1 = this.userService.getUsersByIds([1,2,3,4,5]);
    const obs2 = this.userService.getUsersByIds([6,7,8,9,10]);
    concat(obs1, obs2).subscribe(users => {
      console.log(users)
    })
  }

  useCombineLatest(): void {
    combineLatest([this.userService.loadAllUsers(), this.userService.loadAllPosts()]).pipe(
      map(([users, posts]) => {
        return users.map((user: User) => {
          const userPosts = posts.filter(post => post.userId === user.id)
          return {
            ...user, postsCount: userPosts.length
          }
        })
    })
    ).subscribe(results => {
      console.log(results)
    })
  }

  useCombineLatestWithCompanyAndCity(): void {
    combineLatest([
      this.users$,
      this.companyControl.valueChanges.pipe(startWith('')),
      this.cityControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      debounceTime(300),
      map(([users, companyName, cityName]) => {
        debugger
        return users.filter(user =>
          user.company?.name === companyName &&
          user.address?.city ===  cityName
        );
      })
    ).subscribe(results => {
      debugger
      this.filteredUsers = results;
      console.log(results, 'filtered users');
    });
  }

  useMerge() {
    const obs1 = this.userService.getUsersByIds([1,2,3,4,5]);
    const obs2 = this.userService.getUsersByIds([6,7,8,9,10]);
    merge(obs1, obs2).subscribe(users => {
      console.log(users)
    })
  }

  useConcatMap() {
    const userIds = [1,2,3]
    from(userIds).pipe(concatMap(id => this.userService.loadUser(id))
    ).subscribe(result => console.log(result))
  }

  getFullName() {
    this.users$.pipe(
      map(users => users.map(user => user.name))
    ).subscribe(result => {
      console.log(result);
    });
  }

  useMergeMap() {
    const userIds = [1,2,3];
    from(userIds).pipe(mergeMap(id => this.userService.loadUser(id))
    ).subscribe(result => console.log(result));
  }

  compareUsers(user1Id: number, user2Id: number) {
    forkJoin({
      user1Posts: this.userService.getUsersByIds([user1Id]),
      user2Posts: this.userService.getUsersByIds([user2Id])
    }).subscribe(({user1Posts, user2Posts}) => {
      const count1 = user1Posts.length;
      const count2 = user2Posts.length;
      this.result = count1 > count2 ?
        `User ${user1Id} has more posts (${count1} > ${count2})`
        : count1 < count2
        ? `User ${user2Id} has more posts (${count2} > ${count1})`
          : `Users have the same number of posts (${count1})`
      console.log(this.result)
    })
  }


  protected readonly filter = filter;
}

