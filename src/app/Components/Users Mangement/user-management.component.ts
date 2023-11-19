import { UsersManagmentService } from './../../Services/users-managment.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  employee: any;
  data: any;
  userId: string = '';
  flag: boolean = false;

  AddUser = new FormGroup({
    empId: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    selectRolesIds: new FormControl<any[]>([],[Validators.required]),
    userId: new FormControl(),
  });

  get controls() {
    return this.AddUser.controls;
  }

  constructor(private userService: UsersManagmentService) {}

  ngOnInit(): void {
    this.dtoption = {
      pagingType: 'full_numbers',
    };

    this.userService.GetDataFormToCreate().subscribe({
      next: (response: any) => {
        this.employee = response;

        this.userService.GetAllUsers().subscribe({
          next: (response) => {
            this.userService.GetAllUsers().subscribe({
              next: (response: any) => {
                this.data = response;
              },
            });
          }
        });
      },
    });
  }

  OnSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;

    if (this.AddUser.valid) {
      if (this.userId !== '') {
        console.log(this.userId);
        console.log(this.AddUser.value);
        this.userService.EditUser(this.AddUser.value, this.userId).subscribe({
          next: (Response) => {
            this.userService.GetAllUsers().subscribe({
              next: (response: any) => {
                this.data = response;
                this.flag = true;
              },
            });
          },
        });
      } else {
        console.log(this.userId);
        console.log(this.AddUser.value);
        this.userService.AddNewUser(this.AddUser.value).subscribe({
          next: (Response) => {
            this.userService.GetAllUsers().subscribe({
              next: (response: any) => {
                this.data = response;
                this.OnReset();
                this.flag = false;
              },
            });
          },
        });
      }
    }
  }

  OnEdit(userId: string) {
    this.flag = true;
    
    this.userService.GetUserById(userId).subscribe({
      next: (Response: any) => {
        this.AddUser.controls['empId'].setValue(Response.empId);
        this.AddUser.controls['userName'].setValue(Response.userName);
        this.AddUser.controls['password'].setValue(Response.password);
        this.AddUser.controls['email'].setValue(Response.email);
        this.AddUser.controls['selectRolesIds'].setValue(Response.selectRolesIds);
        this.AddUser.controls['userId'].setValue(Response.userId);
        this.employee = Response;
        this.userId = userId;
  
        // Update selectedItems array with the values from selectRolesIds
        this.selectedItems = Response.selectRolesIds || [];
      },
    });
  }

  OnDelete(userId: string) {
    console.log(userId);

    this.userService.DeleteUser(userId).subscribe({
      next: (Response) => {
        this.userService.GetAllUsers().subscribe({
          next: (response) => {
            this.data = response;
            this.OnReset();
          },
        });
      },
    });
  }

  selectedItems: string[] = [];

  itemSelectionChanged(itemId: string) {
    if (this.selectedItems.includes(itemId)) {
      this.selectedItems = this.selectedItems.filter((value) => value !== itemId);
    } else {
      this.selectedItems.push(itemId);
    }

    this.controls.selectRolesIds.setValue(this.selectedItems);
  }

 OnReset() {
  this.AddUser.controls['empId'].setValue('');
  this.AddUser.controls['userName'].setValue('');
  this.AddUser.controls['password'].setValue('');
  this.AddUser.controls['email'].setValue('');
  this.AddUser.controls['selectRolesIds'].setValue([]);
  
  // Reset the selectedItems array to empty
  this.selectedItems = [];
// Disable the touched state of the form controls
this.AddUser.markAsUntouched();
  this.userService.GetDataFormToCreate().subscribe({
    next: (response: any) => {
      this.employee = response;
    },
  });
  
  this.userId = '';
  this.flag = false;
 
}

}
