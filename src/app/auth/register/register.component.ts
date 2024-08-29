import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      profile: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        bio: [''],
        resume: [null], 
        contactNumber: ['', Validators.required],
        companyName: [''], 
        companyWebsite: ['']  
      })
    }, {
      validator: this.passwordMatchValidator
    });

    // Subscribe to changes in the role field to dynamically adjust validators
    this.registerForm.get('role')?.valueChanges.subscribe(role => {
      this.adjustValidatorsBasedOnRole(role);
    });
  }

  private adjustValidatorsBasedOnRole(role: string): void {
    const profile = this.registerForm.get('profile');
    const resume = profile?.get('resume');
    const companyName = profile?.get('companyName');
    const companyWebsite = profile?.get('companyWebsite');


    resume?.clearValidators();
    companyName?.clearValidators();
    companyWebsite?.clearValidators();

    if (role === 'jobseeker') {
      resume?.setValidators([Validators.required]);
      companyName?.setValidators(null);
      companyWebsite?.setValidators(null);
    } else if (role === 'employer') {
      companyName?.setValidators([Validators.required]);
      companyWebsite?.setValidators([Validators.required]);
      resume?.setValidators(null);
    }


    resume?.updateValueAndValidity();
    companyName?.updateValueAndValidity();
    companyWebsite?.updateValueAndValidity();
  }


  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ mustMatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  get f() { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    
    if (this.registerForm.invalid) {
      return;
    }

    const registerData: any = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      role: this.registerForm.get('role')?.value,
      profile: {
        firstName: this.registerForm.get('profile.firstName')?.value,
        lastName: this.registerForm.get('profile.lastName')?.value,
        age: this.registerForm.get('profile.age')?.value,
        bio: this.registerForm.get('profile.bio')?.value,
        contactNumber: this.registerForm.get('profile.contactNumber')?.value,
      }
    };

   
    const role = this.registerForm.get('role')?.value;
    if (role === 'jobseeker') {
      registerData.profile.resume = this.registerForm.get('profile.resume')?.value;
    } else if (role === 'employer') {
      registerData.profile.companyName = this.registerForm.get('profile.companyName')?.value;
      registerData.profile.companyWebsite = this.registerForm.get('profile.companyWebsite')?.value;
    }

    
    console.log('Register Data:', registerData);


    this.http.post('http://localhost:3000/api/users/register', registerData)
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (error: any) => console.error('There was an error!', error)
      });
  }
}
