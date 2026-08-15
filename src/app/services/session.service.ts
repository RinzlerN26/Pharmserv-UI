import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AppState } from '../reducer';
import { setUserDetails } from '../actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private store: Store<AppState>,
  ) {}

  restoreSession(): void {
    if (!this.authService.hasActiveSession()) {
      return;
    }

    const userStringId = sessionStorage.getItem('userId');

    if (!userStringId) {
      return;
    }

    this.userService.getUserDetails(userStringId).subscribe({
      next: (response) => {
        sessionStorage.setItem('userIntId', response?.userIntId);

        this.store.dispatch(
          setUserDetails({
            userName: response?.userName,
            userEmail: response?.userEmail,
          }),
        );
      },

      error: (err) => {
        console.error('Failed to restore user session', err);
      },
    });
  }
}
