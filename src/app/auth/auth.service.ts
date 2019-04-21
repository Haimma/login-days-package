import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthUser } from './authUser.model';
import { Statement } from '@angular/compiler';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token: string;
  private userId: number;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  createUser(email: string, password: string) {
    const authUser: AuthUser = {email, password};
    this.http.post('http://localhost:3000/api/Auth/signup', authUser)
    .subscribe((res) => {});
  }

  login(email: string, password: string) {
    const loginUser: AuthUser = {email, password};
    this.http.post<{ token: string, userId: number, expiresIn: number}>('http://localhost:3000/api/Auth/login', loginUser)
    .subscribe((res) => {
      const token = res.token;
      this.token = token;
      const userId = res.userId;
      if (this.token) {
        const expiresIn = res.expiresIn;
        this.setAuthTimer(expiresIn);
        this.userId = userId;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresIn * 1000);
        this.saveAuthData(this.token, this.userId, expirationDate);
        this.router.navigate(['/addPackages']);
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.userId = null;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const stillFuture = authInfo.expirationDate.getTime() - now.getTime();
    if (stillFuture > 0) {
      this.token = authInfo.token;
      this.isAuthenticated = true;
      this.userId = authInfo.userId;
      this.setAuthTimer(stillFuture / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  private saveAuthData(token: string, userId: number, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId.toString());
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate');

    if (!token || !userId || !expirationDate) {
      return;
    }
    return {
      token,
      userId: Number(userId),
      expirationDate: new Date(expirationDate)
    };
  }
}
