import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('token');
  if (token) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
