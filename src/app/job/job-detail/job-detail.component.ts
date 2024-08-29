import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../../../../services/job.service';
import { AuthService } from '../../../../services/auth.service';
import { response} from 'express';
import { ApplicationService } from '../../../../services/application.service';
import { UserService } from '../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {
  jobId : string | null = null;
  jobDetails :any;
  role: string | null = null;
  userId: any;
  user: any;
  
  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService : AuthService,
    private applicationService: ApplicationService,
    private router : Router,
    private userService :UserService,
    private snakeBar : MatSnackBar
  ){}
  ngOnInit(): void {
    // Capture the job ID from the route parameters
    this.jobId = this.route.snapshot.paramMap.get('id');
    //console.log('Job ID from route:', this.jobId);
    this.role = this.authService.getUserRole();
    this.userId = this.authService.getUserId();
    if (this.jobId) {
      // Fetch the job details using the job ID
      this.jobService.getJobById(this.jobId).subscribe((job) => {
        this.jobDetails = job;
        if (typeof this.jobDetails.requirements === 'string')
        {
          this.jobDetails.requirements = this.jobDetails.requirements.split(',').map((req: string) => req.trim());
        }
      });
    } else {
      console.error('Job ID is undefined');
    }
  }
  deleteJob(jobId :string):void{
    this.jobService.deleteJob(jobId).subscribe(
      (response) =>{
        console.log ('Job Deleted successfully', response);
        this.snakeBar.open('Job Deleted successfully' , 'Close',{
          verticalPosition : 'top',
          horizontalPosition :'center'
        });
        this.router.navigate(['/jobList']);
      },
      (error) =>{
        console.error ('Error deleting the job' , error);
      }
    );

  }
  applyJob(): void {
    this.userService.getUserDetails().subscribe(
      (userDetails) => {
        this.user = userDetails;
        const applicationData = {
          job: this.jobId,
          resume: this.user.profile.resume,
          applicant : this.userId,
          status :'Applied' 

        };
        this.applicationService.createApplication(applicationData).subscribe(
          (response) => {
            console.log('Application successful:', response);
            this.snakeBar.open('Job Applied successfully' , 'Close',{
              duration : 3000,
              verticalPosition : 'top',
              horizontalPosition :'center'
            });
            this.router.navigate(['/applicationlist']);
          },
          (error) => {
            console.error('Error applying for job:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching user details for application:', error);
      }
    );
  }
 
  
  
}
