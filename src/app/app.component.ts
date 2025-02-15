import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppState } from './reducer';  // Import the AppState interface
import { increment, decrement, reset } from './actions/counter.actions';  // Import your actions
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  imports: [CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
 title = 'PharmServ';

  counter$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.counter$ = this.store.select((state) => state.counter);
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
