import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

const API_URL = 'https://your-api.com/auth'; // Replace with your backend API

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${API_URL}/login`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.decodeToken(response.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserRole(): string {
    return this.userSubject.value?.role || 'guest';
  }

  private decodeToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.userSubject.next(payload);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  private loadUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      this.decodeToken(token);
    }
  }
}
