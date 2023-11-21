import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { DepartmentService } from 'src/app/Services/department.service';
import { MessageService } from 'primeng/api';
import { ToastService } from 'src/app/Services/toast.service';

@Component({
  selector: 'app-department-view',
  templateUrl: './department-view.component.html',
  styleUrls: ['./department-view.component.css'],
  providers: [MessageService], // <-- Add this line
})
export class DepartmentViewComponent implements OnInit {
  departments: any;
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    public deptservice: DepartmentService,
    public Route: Router,
    public getid: ActivatedRoute,

    private toastService: ToastService
  ) { }

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

          // Show toast for delete action (success)
          this.toastService.showToast('success', 'Done', 'Delete Department done');
        },
        error: (error) => {
          console.error('Error:', error); // Handle error response if needed

          // Show toast for delete action with error
          this.toastService.showToast('error', 'Error', 'Delete Department failed');
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

  Toggle() {
    this.Show = true
  }

  get controlsname() {
    return this.formadd.controls;
  }
  Edit(deparmentId: any) {
    this.Show = true

    this.deptid = deparmentId;
    this.deptservice.GetDepartmentById(deparmentId).subscribe({
      next: (response: any) => {
        this.formadd.controls['id'].setValue(response.id);
        this.formadd.controls['name'].setValue(response.name);
      },
      
    });
  }

  OnReset() {
    this.formadd.controls['id'].setValue(0);
    this.formadd.controls['name'].setValue('');
    this.Show = !this.Show
    this.deptid = 0;
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
                  this.toastService.showToast('success', 'Done', 'Edit Department done');
                },
              });
            },
            error: (error: any) => {
              
              this.ModelState = error.error;
              this.toastService.showToast('error', 'Error', 'Edit Department failed');
            },
          });
        this.OnReset();
      } else {
        this.deptservice.AddDepartment(this.formadd.value).subscribe({
          next: () => {
            this.deptservice.GetAllDepartment().subscribe({
              next: (response) => {
                this.departments = response;
                this.toastService.showToast('success', 'Done', 'Add Department done');
              },
              error: (error) => {

                this.ModelState = error.error;
                this.toastService.showToast('error', 'Error', 'Add Department failed');
              }
            });
          },
        });
        this.OnReset();
      }
    }
  }
}