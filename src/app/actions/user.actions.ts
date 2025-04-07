import { createAction, props } from '@ngrx/store';

export const setUserDetails = createAction(
  'Set User Details',
  props<{ userEmail: string; userName: string }>()
);

export const revertUserDetails = createAction('Revert User Details');
