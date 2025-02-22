import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  template: `<app-header></app-header> <router-outlet></router-outlet>`,
})
export class AppComponent {}
