import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserSelectionServiceService {
  selectedUserSubject = new Subject<User>();
  selectedUser$ = this.selectedUserSubject.asObservable();

  constructor() { }
  selectUser(user: User) {
    this.selectedUserSubject.next(user)
  }
}
