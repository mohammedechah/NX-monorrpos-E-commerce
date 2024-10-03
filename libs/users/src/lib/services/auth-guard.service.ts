import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const localStorageToken = inject(LocalstorageService);
  const token = localStorageToken.getToken();

  if (state.url === '/login') {
    return true; // Avoid looping on login page
  }

  if (token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));
    if (tokenDecode.isAdmin && !isTokenExpired(tokenDecode.exp)) {
      return true;
    }
  }

  router.navigate(['/login']);
  return false;
};

const isTokenExpired = (expiration: any): boolean => {
  return Math.floor(new Date().getTime() / 1000) >= expiration;
};
