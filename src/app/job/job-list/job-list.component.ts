import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';
import { JobService } from '../../../../services/job.service';
import { error } from 'console';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
  jobs: any[] = [];
  role :any;

  constructor(private http :HttpClient,
    private router : Router,
    private authService :AuthService,
    private jobService : JobService
  ){}
  ngOnInit(): void {
    this.role = this.authService.getUserRole();
    if (this.role === 'employer')
    {
      this.loadJobsForEmployer();
    }
    else{
      this.loadJobs();
    }
   
    
  }
  loadJobs():void{
    this.http.get<any[]>('http://localhost:3000/api/jobs').subscribe(data=>{
      this.jobs = data;
      //console.log(this.jobs);
    })
  }
  loadJobsForEmployer(){
    const  employerId = this.authService.getUserId();
    if (employerId){
      this.http.get<any[]>('http://localhost:3000/api/jobs').subscribe((data)=>{
        this.jobs = data.filter(job =>  job.employer && job.employer._id === employerId);
        console.log(this.jobs)
      },
      (error) => {
        console.error('error loading jobs' , error);
      }
    );
    }
    else {
      console.error('employer Id is undefined')
    }
    
  }
  viewDetails(jobId: string): void {
    if (jobId) {
      this.router.navigate(['jobDetails', jobId]);
    } else {
      console.error('Job ID is undefined.');
    }
  
  }
  gotoDetails(){
    this.router.navigate(['./jobDetails']);
  }

}
