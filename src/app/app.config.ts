import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideRedux } from "@reduxjs/angular-redux";
import { routes } from './app.routes';
import store  from "../app/store";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideRedux({ store })]
};
