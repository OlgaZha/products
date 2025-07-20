import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/logger.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable
} from 'rxjs';
import {RxjsOperatorsUtilsService} from '../../services/rxjs-operators-utils.service';
import {UserSelectionServiceService} from '../../services/user-selection-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: false
})
export class UsersComponent implements  OnInit {
  companyControl = new FormControl('');
  cityControl = new FormControl('');
  usersControl = new FormControl('')
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
  selectedUser!: User;
  refreshUsers$!:  Observable<User[]>;
  filteredUsers$!:Observable<User[]>;
  constructor(private userService: UserService, private fb: FormBuilder, private _loggerService: LoggerService, private _rxjsService: RxjsOperatorsUtilsService, private _selectUser: UserSelectionServiceService) {
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
    this.users$ = this.userService.loadAllUsers();
    this.companies$ = this.users$.pipe(
      map(users => [...new Set(users.map(user => user.company?.name))])
    )
    this.cities$ = this.users$.pipe(
      map(users => [...new Set(users.map(user => user.address?.city))])
    )
    this._rxjsService.getFullName(this.users$);
    this._rxjsService.useMergeMap();
    this._rxjsService.compareUsers(1,2);
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

    this._selectUser.selectedUser$.subscribe(selectedUser => this.selectedUser = selectedUser)
    this.refreshUsers$ = this.userService.users$;
    this.filteredUsers$ = this.userService.getFilteredUsers()
    }
  getAllUsers(): void {
    this.userService.loadAllUsers().subscribe(users => {
      this.users = users;
      this.filteredUsers = this.users;
    });
  }

  selectUser(user: User) {
    this._selectUser.selectUser(user)
  }

  refresh() {
    this.userService.refreshUsers()
  }

  onSearch(event: Event) {
    let input = event.target as HTMLInputElement;
    this.userService.searchUsers(input.value)
  }

  // onUserControlValueChanged() {
  //   this.usersControl.valueChanges.pipe(
  //     switchMap((category: string|null) => category ? this.userService.loadAllUsers(category) : of())
  //   ).subscribe(result => this.users = result);
  // }
}

