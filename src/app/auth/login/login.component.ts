import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
  
      this.authService.login(email, password).subscribe(response => {
        if (response && response.token) {

          localStorage.setItem('userToken', response.token);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('role', response.role);
          
         
          this.router.navigate(['/profile']);
        } else {
          this.snackBar.open('Invalid Credentials!', 'Close', {
            verticalPosition: 'top', 
            horizontalPosition: 'center'
          });
          console.error('Login failed');
          
        }
      });
    }
    console.log(this.loginForm.value);
  }
}
