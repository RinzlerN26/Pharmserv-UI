import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const userGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/signin']);
    return false;
  }

  if (authService.isAdmin()) {
    router.navigate(['/admin']);
    return false;
  }

  return true;
};
