import { createReducer, on } from '@ngrx/store';
import { setUserDetails, revertUserDetails } from '../actions/user.actions';

export interface UserState {
  userName: string;
  userEmail: string;
}

const initialState: UserState = {
  userName: '',
  userEmail: '',
};

export const userReducer = createReducer(
  initialState,
  on(setUserDetails, (state, { userName, userEmail }) => ({
    ...state,
    userName: userName,
    userEmail: userEmail,
  })),
  on(revertUserDetails, () => initialState)
);
