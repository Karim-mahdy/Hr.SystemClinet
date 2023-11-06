import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentViewComponent } from './Components/Department/Department View/department-view.component';
import { DepartmentFormComponent } from './Components/Department/Department Form/department-form.component';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { EmployeeformComponent } from './Components/Employee/Employee Form/employee-form.component';
import { EmployeeviewComponent } from './Components/Employee/Employee View/employee-view.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DepartmentViewComponent,
    DepartmentFormComponent,
    EmployeeformComponent,
    EmployeeviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
