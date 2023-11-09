import { AccessDeniedComponent } from './Components/Access denied/access-denied.component';
import { PublicholidaysComponent } from './Components/PublicHolidays/publicholidays.component';
import { DepartmentFormComponent } from './Components/Department/Department Form/department-form.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Components/Dashboard/dashboard.component';
import { DepartmentViewComponent } from './Components/Department/Department View/department-view.component';
import { EmployeeformComponent } from './Components/Employee/Employee Form/employee-form.component';
import { EmployeeviewComponent } from './Components/Employee/Employee View/employee-view.component';
import { SalaryReportsComponent } from './Components/Salary/salary-reports.component';
import { AttendanceviewComponent } from './Components/Attendance/Attendance View/attendanceview.component';
import { AttendanceformComponent } from './Components/Attendance/Attendance Form/attendanceform.component';
import { GeneralSettingComponent } from './Components/GeneralSetting/general-setting.component';
import { UserManagementComponent } from './Components/Users Mangement/user-management.component';
import { RoleManagementComponent } from './Components/Roles Managment/role-management.component';
import { SignInComponent } from './Components/Authentication/Sign In/sign-in.component';
import { PermissionsGurdService } from './Services/permissions-gurd.service';
import { WelcomeComponent } from './Components/Dashboard/Welcome/welcome.component';

const routes: Routes = [


  { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
  {
    path: 'Dashboard', component: DashboardComponent,
    canActivate: [PermissionsGurdService],
    children: [
      { path: 'Welcome', component: WelcomeComponent },
      { path: 'Depatment', component: DepartmentViewComponent },
      { path: 'Depatment/Add', component: DepartmentFormComponent },
      { path: 'Depatment/Edit/:id', component: DepartmentFormComponent },
      { path: 'Employee', component: EmployeeviewComponent },
      { path: 'Employee/Add', component: EmployeeformComponent },
      { path: 'Employee/Edit/:id', component: EmployeeformComponent },
      { path: 'Salary', component: SalaryReportsComponent },
      { path: 'Attendance', component: AttendanceviewComponent },
      { path: 'Attendance/Add', component: AttendanceformComponent },
      { path: 'Attendance/Edit/:id', component: AttendanceformComponent },
      { path: 'PublicHolidays', component: PublicholidaysComponent },
      {
        path: 'GeneralSettings',
        component: GeneralSettingComponent,
        data: {
          allowedRoles: ["SuperAdmin"],
          allowedPermissions: [
            "Permission.GeneralSetting.View",
            "Permission.GeneralSetting.Edit",
            "Permission.GeneralSetting.Add",
            "Permission.GeneralSetting.Delete"
          ]
        },
        canActivate: [PermissionsGurdService]
      },
      
      { path: 'UsersManagement', component: UserManagementComponent },
      { path: 'RolesManagement', component: RoleManagementComponent },
      { path: 'AccessDenied', component: AccessDeniedComponent },

    ],

  },
  { path: 'SignIn', component: SignInComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
