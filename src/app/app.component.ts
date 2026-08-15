import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  template: `<app-header></app-header> <router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private sessionService: SessionService) {
    this.sessionService.restoreSession();
  }
}
