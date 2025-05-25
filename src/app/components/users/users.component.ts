import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  constructor(private userService: UserService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
    })
  }

  get features(): FormArray {
    return (this.form.get('features') as FormArray)
  }

  addFeature() {
    (this.form.get('features') as FormArray).push(this.fb.control(''))
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
      }
    }
  }

  ngOnInit(): void {
  this.getAllUsers()
    }
  getAllUsers(): void {
    this.userService.getUsers().subscribe(users => {this.users = users});
  }
}
