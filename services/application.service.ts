import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/api/applications';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

//fetch derails and store it
  getApplicationById(applicationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${applicationId}`).pipe(
      map(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('selectedApplication', JSON.stringify(response));
        }
        return response;
      }),
      catchError(error => {
        console.error('Error fetching application details', error);
        return of(null);
      })
    );
  }


  //return the stored applications from the local storage
  getStoredApplication(): any{
    if (isPlatformBrowser(this.platformId)){
      return JSON.parse(localStorage.getItem('selectedApplication') || '{}');

    }
    return null;
  }
  createApplication(application: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, application);
  }

}
