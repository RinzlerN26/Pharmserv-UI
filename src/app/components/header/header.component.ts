import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isUserIdPresent();
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
