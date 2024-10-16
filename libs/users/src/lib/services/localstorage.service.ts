import { Injectable } from '@angular/core';


  const TOKEN = 'jwtToken'
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  
  constructor() { }

  setToken(data : any) {
    localStorage.setItem(TOKEN, data);
  }
  getToken() : any {
    return localStorage.getItem(TOKEN);
  }
  removeToken() {
     localStorage.removeItem(TOKEN);
  }
  isValidToken(){
    const token = this.getToken();
    if (token) {
      const tokenDecod = JSON.parse(atob(token.split('.')[1]));
      return !this.isTokenExpired(tokenDecod.exp);
    } else {
      return false;
    }
  }
  getUserIdFromToken(){
    const token = this.getToken();
    if (token) {
      const tokenDecod = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecod) {
        return tokenDecod.userId;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  private isTokenExpired = (expiration: any): boolean => {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  };
}
