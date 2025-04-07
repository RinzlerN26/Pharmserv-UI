import { ActionReducerMap } from '@ngrx/store';
import { userReducer, UserState } from './reducers/user.reducer';

export interface AppState {
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReducer,
};
