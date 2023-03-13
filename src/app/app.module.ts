import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './Views/app-component/app.component';
import { AdminDashboardComponent } from './Views/admin-dashboard/admin-dashboard.component';
import { ContactUsComponent } from './Views/contact-us/contact-us.component';
import { AboutComponent } from './Views/about/about.component';
import { UserDetailsComponent } from './Views/user-details/user-details.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { AngularMaterialModule } from './Imports/angular-material.module';
import { ExportModule } from './Export/export';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Export_Routes } from './Export/routes';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { TaskComponent } from './Views/task/task.component';
import { TaskBoardComponent } from './Views/task-board/task-board.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    NotFoundComponent,
    UserDetailsComponent,
    AboutComponent,
    ContactUsComponent,
    TaskComponent,
    TaskBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ExportModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    RouterModule.forChild(Export_Routes),
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
