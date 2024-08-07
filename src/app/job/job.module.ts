import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobFormComponent } from './job-form/job-form.component';



@NgModule({
  declarations: [
    JobListComponent,
    JobDetailComponent,
    JobFormComponent
  ],
  imports: [
    CommonModule
  ]
})
export class JobModule { }
