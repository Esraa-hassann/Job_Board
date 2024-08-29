import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service'; 
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  userId :any;
  selectedFile: File | null = null;
  role: any;

  constructor(private fb: FormBuilder, private userService: UserService,
    private authService: AuthService,
    private snackBar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.role = this.authService.getUserRole();
    
    
    this.profileForm = this.fb.group({
      email: [ '', [Validators.required, Validators.email]],
      profile: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        age: ['', Validators.required],
        contactNumber: ['', [Validators.required, Validators.minLength(11)]],
        bio: [''],
        resume: [''],
        companyName: [''],
        companyWebsite: ['']
      })
    });

    
    this.userService.getUserProfile().subscribe(data => {
      console.log('User data:', data);
      this.profileForm.patchValue(data);
    });
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    
  
  }


  onSubmit(): void {
    if (this.profileForm.valid) {
      const updateData = this.profileForm.getRawValue();
      const formData = new FormData();

      formData.append('email', updateData.email);
      formData.append('profile', JSON.stringify(updateData.profile));
      if (this.selectedFile) {
        formData.append('resume', this.selectedFile);
      }

      this.userService.updateUserDetails(this.userId, formData).subscribe(response => {
        console.log('Profile updated successfully', response);
        this.snackBar.open('Profile updated successfully!', 'Close', {
          verticalPosition: 'top', 
          horizontalPosition: 'center'
        });
      }, error => {
        console.error('Error updating profile', error);
      });
    }
  }
}
