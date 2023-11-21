import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/Services/department.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css'],
})
export class DepartmentViewComponent implements OnInit {
  serverErrors: string[] = [];
  departments: any;
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    public deptservice: DepartmentService,
    public Route: Router,
    public getid: ActivatedRoute
  ) {}

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
        },
      });
    }
  }

  submitted: boolean = false;
  deptid: any;
  Show: boolean = false;
  ModelState: any;
  formadd = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(2),
    ]),
  });

  Toggle(){
    this.Show=true
  }

  get controlsname() {
    return this.formadd.controls;
  }
  Edit(deparmentId: any) {
    this.Show=true
    
    this.deptid = deparmentId;
    this.deptservice.GetDepartmentById(deparmentId).subscribe({
      next: (response: any) => {
        this.formadd.controls['id'].setValue(response.id);
        this.formadd.controls['name'].setValue(response.name);
      },
    });
  }

  OnReset(source = '') {
 
    if (source == 'cancel') {
      // Do something specific when called from the "Cancel" button
      this.formadd.controls['id'].setValue(0);
      this.formadd.controls['name'].setValue('');
      this.Show=!this.Show
      this.deptid = 0;
      this.clearServerErrors();

  } else {

      // Do something else when called from another source
      this.clearServerErrors();
      this.formadd.controls['id'].setValue(0);
      this.formadd.controls['name'].setValue('');
      this.Show=!this.Show
      this.deptid = 0;

      console.log('Reset called from another source');
  }
  }

  OnSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    if (this.formadd.valid) {
      
      if (this.deptid > 0) {
        this.deptservice
          .EditDepartment(this.formadd.value, this.deptid)
          .subscribe({
            next: (res) => {
              this.deptservice.GetAllDepartment().subscribe({
                next: (response: any) => {
                  this.departments = response;
                },
              });
            },
            error: (error: any) => {
              //console.log(error.error.DeptName[0]);
              console.log(error.error.DeptName[0]);
      
              this.clearServerErrors();
              this.serverErrors.push(error.error.DeptName[0]);
              //this.serverErrors.push(error.message);
              console.log(this.serverErrors);
          },
          });
        this.OnReset();
      } else {
        this.deptservice.AddDepartment(this.formadd.value).subscribe({
          next: () => {
            this.deptservice.GetAllDepartment().subscribe({
              next: (response) => {
                this.departments = response;
              },
              error: (error: any) => {
                this.clearServerErrors();
                
                this.serverErrors.push(error.error.DeptName[0]);
                console.log(this.serverErrors);
            }
            });
          }, 
          error: (error: any) => {
            this.clearServerErrors();
            
            this.serverErrors.push(error.error.DeptName[0]);
            console.log(this.serverErrors);
        }
        });
        this.OnReset();
      }
    }
  }
  clearServerErrors() {
    this.serverErrors = [];
  }

}