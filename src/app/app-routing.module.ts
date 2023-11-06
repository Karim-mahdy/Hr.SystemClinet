import { DepartmentFormComponent } from './Components/Department/Department Form/department-form.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { DepartmentViewComponent } from './Components/Department/Department View/department-view.component';
import { EmployeeformComponent } from './Components/Employee/Employee Form/employee-form.component';
import { EmployeeviewComponent } from './Components/Employee/Employee View/employee-view.component';

const routes: Routes = [


  {path: '', redirectTo: 'Dashboard', pathMatch: 'full'},
  {path: 'Dashboard', component: DashboardComponent,

  children: [
    {path:'Depatment',component:DepartmentViewComponent},
    {path:'Depatment/Add',component:DepartmentFormComponent},
    {path:'Depatment/Edit/:id',component:DepartmentFormComponent},
    
    {path:'Employee',component:EmployeeviewComponent},
    {path:'Employee/Add',component:EmployeeformComponent},
    {path:'Employee/Edit/:id',component:EmployeeformComponent}
    
  ]

}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
