import { ActionReducerMap } from '@ngrx/store';
import { counterReducer } from '../app/reducers/counter.reducer'; // Import the counterReducer

export interface AppState {
  counter: number;  
}

export const reducers: ActionReducerMap<AppState> = {
  counter: counterReducer,  
};
