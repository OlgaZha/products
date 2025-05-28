import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoggerService} from '../../services/logger.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  standalone: false
})
export class UsersComponent implements  OnInit {
  newUser ={
    name: '',
    username: '',
    email: '',
    phone: '',
}
  form: FormGroup;
  users: User[] = [];
  defaultId = 1;
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
    }
  getAllUsers(): void {
    this.userService.loadAllUsers().subscribe(users => {this.users = users});
  }
}
