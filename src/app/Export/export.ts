import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Export_Routes } from './routes';
import { UsersComponent } from '../Views/users/users.component';
import { AngularMaterialModule } from '../Imports/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(Export_Routes),
    AngularMaterialModule
  ],
  declarations: [
    UsersComponent
  ]
})
export class ExportModule { }