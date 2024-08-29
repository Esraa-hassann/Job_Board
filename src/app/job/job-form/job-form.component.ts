import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent implements OnInit{
  jobForm!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router,
    private authService: AuthService,
    private snackBar : MatSnackBar
  ){}
  ngOnInit(): void {
    this.jobForm = this.fb.group({
      jobTitle : ['', Validators.required],
      description : ['' , Validators.required],
      location : ['', Validators.required],
      requirements : ['', Validators.required],
      jobType : ['' , Validators.required],
      salary : ['' , Validators.required]
    });
  

  }
  onSubmit(): void {
    if (this.jobForm.valid) {
        const formData = {
            ...this.jobForm.value,
            employerId: this.authService.getUserId() // Assume authService has a method to get the current user ID
        };

        this.http.post('http://localhost:3000/api/jobs', formData)
            .subscribe({
                next: (response) => {
                    console.log('Job created successfully!', response);
                    this.snackBar.open('Job Added successfully!', 'Close', {
                      verticalPosition: 'top', 
                      horizontalPosition: 'center'
                    });
                    this.router.navigate(['/jobList']);
                },
                error: (error) => console.error('There was an error!', error)
            });
    } else {
        console.error('Form is invalid');
    }
}


}
