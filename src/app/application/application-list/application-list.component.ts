import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { ApplicationService } from '../../../../services/application.service';
import { application } from 'express';

@Component({
  selector: 'app-application-list',
  templateUrl: './application-list.component.html',
  styleUrls: ['./application-list.component.css']
})
export class ApplicationListComponent implements OnInit {
  applications: any[] = [];
  role: any;
  apiUrl = 'http://localhost:3000/api/applications'; 

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    
    if (this.role === 'jobSeeker')
    {
      this.loadApplications();
    }
    else{
      this.loadEmployerApplicatent();
    }
  }

  loadApplications(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(data => {
      const userId = this.authService.getUserId();
      if (userId) {
        this.applications = data.filter(application => application.applicant && application.applicant._id === userId);
      } else {
        console.error('User not logged in or user ID is not available.');
      }
    });
  }
  loadEmployerApplicatent(){
    const employerId = this.authService.getUserId();
    if (employerId){
      this.http.get<any[]>('http://localhost:3000/api/applications').subscribe((data)=>{
        this.applications = data.filter(application => application.job && application.job.employer && application.job.employer === employerId );
        console.log(this.applications);
      },
    (error) =>{
      console.error('error loading applications', error);
    });
    }
  }

  viewDetails(applicationId: string): void {
    console.log(applicationId);
    if (applicationId) {
      this.applicationService.getApplicationById(applicationId).subscribe(() => {
        this.router.navigate(['/application', applicationId]);
      });
    } else {
      console.error('Application ID is undefined.');
    }
  }
   
}
