import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { ApplicationService } from '../../../../services/application.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css'],
})
export class ApplicationComponent implements OnInit {
  application :any;
  role:any;
  newStatus : string ='';
  constructor(
    private route : ActivatedRoute,
    private http : HttpClient,
    private router : Router,
    private applicationService: ApplicationService,
    private authService :AuthService,
    private snakeBar : MatSnackBar
  ){}

  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    //console.log('Resume Filename:', this.application.applicant.profile.resume);

    const applicationId = this.route.snapshot.paramMap.get('id');
    if (applicationId) {
      this.loadApplicationDetails(applicationId);
    } else {
      this.application = this.applicationService.getStoredApplication();
      if (!this.application) {
        console.error('Application details are not available.');
      }
    }
  }

  loadApplicationDetails(applicationId: string): void {
    this.applicationService.getApplicationById(applicationId).subscribe(data => {
      this.application = data;
    });
  }

  withdrawApplication(): void {
    const applicationId = this.application._id;
    this.http.delete(`http://localhost:3000/api/applications/${applicationId}`)
      .subscribe(() => {
        this.snakeBar.open('Applicaiton withdrawed successfully', 'close',{
          duration : 3000,
          verticalPosition :'top',
          horizontalPosition : 'center'
        });
        this.router.navigate(['/applicationlist']);
      });
  }
  updateStatus(): void {
    const applicationId = this.application._id;
    this.http.put(`http://localhost:3000/api/applications/${applicationId}`, { status: this.newStatus })
      .subscribe(
        () => {
          this.snakeBar.open('Application status updated successfully', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.loadApplicationDetails(applicationId); //to reflect new status
        },
        (error) => {
          console.error('Error updating status', error);
          this.snakeBar.open('Failed to update status', 'close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      );
  }
  getResumeUrl(): string {
    return `/uploads/${this.application?.applicant?.profile?.resume}`;
  }

}
 
 

  
