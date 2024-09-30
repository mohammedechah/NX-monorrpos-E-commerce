import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from '../services/localstorage.service'; 

export const authGuard = () => {
  const router = inject(Router);
  const localStorageService = inject(LocalstorageService);

  const token = localStorageService.getToken();

  if (token) {
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));

    
    if (!isTokenExpired(tokenDecode.exp)) {
      
      if (tokenDecode.isAdmin) {
        return true; 
      } else {
        return false; 
      }
    }
  }

  
  router.navigate(['/login']);
  return false;
};

const isTokenExpired = (expiration: any): boolean => {
  return Math.floor(new Date().getTime() / 1000) >= expiration;
};
