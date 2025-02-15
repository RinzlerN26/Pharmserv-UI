import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from './reducer';
import { increment, decrement, reset } from './actions/counter.actions'; // Import your actions
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'PharmServ';

  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = this.store.select((state) => state.counter.count);
  }

  increment() {
    this.store.dispatch(increment());
  }

  decrement() {
    this.store.dispatch(decrement());
  }

  reset() {
    this.store.dispatch(reset());
  }
}
