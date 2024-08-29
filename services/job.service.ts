import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiUrl = 'http://localhost:3000/api/jobs'; 

  constructor(private http: HttpClient) { }

  // get job by ID
  getJobById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    // console.log('Fetching job details from URL:', url); 
    return this.http.get(url);
  }
  deleteJob(jobId:string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${jobId}`);
  }
  applyForJob(applicationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply`, applicationData);
  }

}
