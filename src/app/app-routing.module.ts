import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './user/profile/profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { ApplicationComponent } from './application/application/application.component';
import { ApplicationListComponent } from './application/application-list/application-list.component';
import { JobFormComponent } from './job/job-form/job-form.component';
import { JobListComponent } from './job/job-list/job-list.component';
import { JobDetailComponent } from './job/job-detail/job-detail.component';
import { AuthGuard } from '../../Guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'profile', component:ProfileComponent, canActivate: [AuthGuard]},
  {path:'profile/edit', component:EditProfileComponent},
  {path:'application/:id', component:ApplicationComponent},
  {path:'applicationlist', component:ApplicationListComponent},
  {path:'jobForm', component:JobFormComponent},
  {path:'jobList', component:JobListComponent},
  {path:'jobDetails/:id', component:JobDetailComponent},
  {path:'*',redirectTo:'', pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
