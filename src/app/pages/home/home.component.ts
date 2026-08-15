import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = 'PharmServ';

  constructor(
    private store: Store<AppState>,
    private router: Router,
  ) {}

  navigateToSignin() {
    this.router.navigate(['/pharma']);
  }
}
