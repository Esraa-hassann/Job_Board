import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationComponent } from './application/application.component';
import { ApplicationListComponent } from './application-list/application-list.component'; 
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CoreModule } from "../core/core.module";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ApplicationComponent,
    ApplicationListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    CoreModule,
    RouterModule
],
  exports: [
    ApplicationComponent,
    ApplicationListComponent
  ]

})
export class ApplicationModule { }
