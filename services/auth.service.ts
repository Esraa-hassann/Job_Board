import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/users'; 

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router : Router
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('userToken', response.token);
              const { id, role } = this.decodeToken(response.token);
              localStorage.setItem('userId', id);
              localStorage.setItem('role', role);
            }
          }
          return response;
        }),
        catchError(error => {
          console.error('Login error', error);
          return of(null);
        })
      );
  }

  private decodeToken(token: string): { id: string, role: string } {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        role: payload.role
      };
    } catch (e) {
      console.error('Error decoding token', e);
      return { id: '', role: '' }; 
    }
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getUserId(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('userId');
    }
    return null;
  }

  getUserRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role'); 
    }
    return null;
  }

  isLoggedIn(): boolean {
    return isPlatformBrowser(this.platformId) && !!localStorage.getItem('userToken');
  }

  getProfile(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers }).pipe(
      catchError(error => {
        console.error('Error fetching profile', error);
        return of(null); 
      })
    );
  }
 

  signOut(): void {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userId'); 
    localStorage.removeItem('role');

    this.router.navigate(['/']).then(() =>{
      window.location.reload();
    });
  }

}
