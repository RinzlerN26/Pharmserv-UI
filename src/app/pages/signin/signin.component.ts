import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.errorMessage = '';
    this.authService.login(this.userStringId, this.userPass).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);
        this.authService.getUserIdFromToken();
        console.log('Login successful!', response);
        alert('Login Successful!');
        this.router.navigate(['/pharma']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid credentials';
        console.error('Login failed', err);
      },
    });
  }
}
