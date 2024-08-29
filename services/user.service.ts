import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users/';

  constructor(
    private http: HttpClient,
    private authService : AuthService
  ) { }

  isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    if (user) {
      try {
        return JSON.parse(user);
      } catch (e) {
        console.error('Error parsing currentUser from localStorage', e);
        return null;
      }
    }
    return null;
  }

  // get user details 
  getUserDetails(): Observable<any> {
    const userId = this.authService.getUserId(); 
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }
  // get user profile
  getUserProfile(): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  //update user 
  updateUserDetails(userId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, formData);
  }

  updateUserProfile(profileData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/profile`, profileData)
  }
  
}
