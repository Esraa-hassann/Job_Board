import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobFormComponent } from './job-form/job-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from "../core/core.module";
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    JobFormComponent,
   

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CoreModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  
]
})
export class JobModule { }
