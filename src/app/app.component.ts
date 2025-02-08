import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RootState } from "../app/store";
import { injectSelector, injectDispatch } from "@reduxjs/angular-redux";
import { decrement, increment } from "../app/reducer/userSlice";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Pharmserv-UI';
  count = injectSelector((state: RootState) => state.user.value);
  dispatch = injectDispatch();
  increment = increment;
  decrement = decrement;
}
