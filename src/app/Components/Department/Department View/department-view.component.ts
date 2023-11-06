import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/Services/department.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css']
})
export class DepartmentViewComponent implements OnInit {
  departments: any;
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(public deptservice: DepartmentService, private router: Router) {}

  public ngOnInit(): void {
    this.deptservice.GetAllDepartment().subscribe({
      next: (response) => {
        this.departments = response;
        this.dtTrigger.next(null);
      },
    });
    this.dtoption = {
      pagingType: 'full_numbers',
    };
  }

  deletedept(departmentId: any) {
    if (confirm('Are you sure to delete the record')) {
      this.deptservice.DeleteDepartment(departmentId).subscribe({
        next: (response) => {
          console.log(response.message); // Display the success message
  
          // Update the departments list (remove the deleted item)
          this.departments = this.departments.filter(
            (dept: any) => dept.id !== departmentId
          );
        },
        error: (error) => {
          console.error('Error:', error); // Handle error response if needed
        }
      });
      
    }
  }
}