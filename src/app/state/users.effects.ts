import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UserService} from '../services/user.service';
import * as UsersActions from './users.actions';
import {catchError, map, mergeMap, of} from 'rxjs';

@Injectable()
export class UsersEffects {
  loadUsers$
  constructor(
    private actions$: Actions,
    private usersService: UserService
  ) {
    this.loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      mergeMap(()=>
       this.usersService.loadAllUsers().pipe(
        map(users => UsersActions.loadUsersSuccess({users})),
        catchError(error => of(UsersActions.loadUsersFailure({error})))
      )
        )
      )
    )
  }
}
