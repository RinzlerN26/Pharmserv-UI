import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducer';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userName$: Observable<string>;

  userEmail$: Observable<string>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.userName$ = this.store.select((state) => state.user.userName);
    this.userEmail$ = this.store.select((state) => state.user.userEmail);
  }

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
