import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
    private router: Router
  ) {}

  onLogin() {
    this.errorMessage = '';
    this.authService.login(this.userStringId, this.userPass).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.getUserIdFromToken();
        console.log('Login successful!', response);
        alert('Login Successful!');
        if (sessionStorage.getItem('userId')) {
          const userStringId = sessionStorage.getItem('userId');
          this.userService.getUserDetails(userStringId).subscribe({
            next: (response) => {
              sessionStorage.setItem('userIntId', response?.userIntId);
              sessionStorage.setItem('userName', response?.userName);
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
