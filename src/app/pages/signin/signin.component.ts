import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducer';
import { setUserDetails } from '../../actions/user.actions';
@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  userStringId = '';
  userPass = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  onLogin() {
    this.errorMessage = '';
    this.authService.login(this.userStringId, this.userPass).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.getUserIdFromToken();
        alert('Login Successful!');
        if (sessionStorage.getItem('userId')) {
          const userStringId = sessionStorage.getItem('userId');
          this.userService.getUserDetails(userStringId).subscribe({
            next: (response) => {
              sessionStorage.setItem('userIntId', response?.userIntId);
              this.store.dispatch(
                setUserDetails({
                  userName: response?.userName,
                  userEmail: response?.userEmail,
                })
              );
              this.router.navigate(['/pharma']);
            },
            error: (err) => {
              console.error('Error Fetching User Details', err);
            },
          });
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials';
        console.error('Login failed', err);
      },
    });
  }
}
