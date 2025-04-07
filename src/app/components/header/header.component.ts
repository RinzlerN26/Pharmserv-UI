import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  userName = '';

  ngOnInit() {
    this.isUserIdPresent();
    if (sessionStorage.getItem('userId')) {
      const userStringId = sessionStorage.getItem('userId');
      this.userService.getUserDetails(userStringId).subscribe({
        next: (response) => {
          sessionStorage.setItem('userIntId', response?.userIntId);
          this.userName = response?.userName;
          console.log(this.userName);
        },
        error: (err) => {
          console.error('Error Fetching User Details', err);
        },
      });
    }
  }

  isUserIdPresent(): boolean {
    if (sessionStorage.getItem('userId')) {
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return !!this.authService.getToken();
  }

  logout(event: Event) {
    event.preventDefault();
    sessionStorage.clear();
    this.router.navigate(['/signin']);
  }
}
