import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application-list/application-list.component';



@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ApplicationModule { }
