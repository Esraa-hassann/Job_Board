import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { subscribe } from 'diagnostics_channel';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  role: string | null = null;
  userToken: string | null = null;
  userId :any;
  user : any;
  profile : any;
  resume!: string;
  constructor(private authService: AuthService, private router: Router,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn){
      this.router.navigate(['/login']);
    }
    this.role = this.authService.getUserRole();
    this.userToken = localStorage.getItem('userToken');
    this.userId = localStorage.getItem('userId');
    this.loadUserDetails();
    
  
    
    
  }
  loadUserDetails():void {
    this.userService.getUserDetails().subscribe({
      next :(data) => {
        this.user =data;
        this.resume = this.user.profile?.resume;

      },
      error :(err) =>{
        console.error('error fetching the user details' , err);
      }
    });
  }

  goToApp() {
    this.router.navigate(['/applicationlist']);
  }

  goToJobForm() {
    this.router.navigate(['/jobForm']);
  }

  goToJobList(){
    this.router.navigate(['/jobList'])
  }
}
