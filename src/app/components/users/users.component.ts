import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/logger.service';
import {
  combineLatest,
  concat,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  startWith,
  switchMap,
  tap
} from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: false
})
export class UsersComponent implements  OnInit {
  companyControl = new FormControl('');
  cityControl = new FormControl('');

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
  searchControl = new FormControl('');
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
    this.useCombineLatest();
    this.useCombineLatestWithCompanyAndCity();
    this.searchControl.valueChanges.pipe(
      filter((searchValue: string | null) => !!searchValue && searchValue.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      map((searchValue: string | null) => {
        return !!searchValue && searchValue.toLowerCase()
      }),
      map((searchValue: any) => {
        return this.users.filter(user => user.name.toLowerCase().includes(searchValue))
      }
    )).subscribe(results => {
      this.filteredUsers = results;
    })
    }
  getAllUsers(): void {
    this.userService.loadAllUsers().subscribe(users => {this.users = users});
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
      this.companyControl.valueChanges.pipe(startWith('')),
      this.cityControl.valueChanges.pipe(startWith(''))
    ]).pipe(
      debounceTime(300),
      map(([company, city]) => {
        const companyLower = (company || '').toLowerCase();
        const cityLower = (city || '').toLowerCase();

        return this.users.filter(user =>
          user.company?.name?.toLowerCase().includes(companyLower) &&
          user.address?.city?.toLowerCase().includes(cityLower)
        );
      })
    ).subscribe(results => {
      this.filteredUsers = results;
      console.log(results, 'filtered users');
    });
  }

  protected readonly filter = filter;
}

