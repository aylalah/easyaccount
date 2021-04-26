import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login : environment.login,
    signup : environment.signup
  }

  constructor() { }

  handle(token: any) {
    this.set(token);
    console.log(this.isValid());
  }

  set(token: string) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    return localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if(token) {
      const payload = this.payload(token);
      if(payload) {
      // return (payload.iss === 'http://localhost:8000/api/login') ? true : false; //easy hint
      return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false ;
      }
    }
    return false;
  }

  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: string) {
    return JSON.parse(atob(payload));
  }

  loggedIn() {
    return this.isValid();
  }
}

