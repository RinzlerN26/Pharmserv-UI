import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from '../app/reducers/counter.reducer';
import { userReducer, UserState } from './reducers/user.reducer';

export interface AppState {
  counter: {
    count: number;
  };
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,
  user: userReducer,
};
