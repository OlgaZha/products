import {User} from '../models/user.model';
import {createReducer, on} from '@ngrx/store';
import * as UsersActions from './users.actions';

export interface UsersState{
  users: User[],
  error: string,
  isLoadingUsers: boolean
}

export const initialState: UsersState = {users: [], error: '', isLoadingUsers: false};
export const userReducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, (state: any) => ({
    ...state,
    isLoadingUsers: true
  })),
  on(UsersActions.loadUsersSuccess, (state, {users}) => ({
    ...state,
    isLoadingUsers: false,
    users: users
  })),
  on(UsersActions.loadUsersFailure, (state, {error}) => ({
    ...state,
    isLoadingUsers: false,
    error
  }))
)
