import { UsersManagmentService } from './../../Services/users-managment.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent {
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  submitted = false;
  employee: any;
  data: any;
  userId:string = '';
 flag:boolean=false
  AddUser = new FormGroup({
    empId: new FormControl('', [Validators.required]),
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    selectRolesIds: new FormControl(),
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
      next: (response:any) => {
        this.employee = response;
        
      },
    });

    this.userService.GetAllUsers().subscribe({
      next: (response) => {
        this.userService.GetAllUsers().subscribe({
          next: (response:any) => {
            this.data = response;
            
          },
        })
        
      }
    })
  }

  OnSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;

    if (this.AddUser.valid) {
      
      console.log(this.userId);
       if(this.userId != ''){
       
        console.log(this.userId);
        console.log(this.AddUser.value);
        this.userService.EditUser(this.AddUser.value,this.userId).subscribe({
          next: (Response) => {
            this.userService.GetAllUsers().subscribe({
              next: (response:any) => {
                this.data = response;
                
              },
            })
          },
        })
       }
       else{
        console.log(this.userId);
        console.log(this.AddUser.value);
        this.userService.AddNewUser(this.AddUser.value).subscribe({
          next: (Response) => {
            this.userService.GetAllUsers().subscribe({
              next: (response:any) => {
                this.data = response;
                
              },
            })
          },
        });
       }
     
    }
       
  }

  OnEdit(userId: string) {
    this.flag=true
    this.userService.GetUserById(userId).subscribe({
      next: (Response:any) => {
        
        this.AddUser.controls['empId'].setValue(Response.empId);
        this.AddUser.controls['userName'].setValue(Response.userName);
        this.AddUser.controls['password'].setValue(Response.password);
        this.AddUser.controls['email'].setValue(Response.email);
        this.AddUser.controls['selectRolesIds'].setValue(Response.selectRolesIds);
        this.AddUser.controls['userId'].setValue(Response.userId);
        this.employee=Response;
        this.userId=userId;
      },
    })
    
  }

  OnDelete(userId: string) {
    console.log(userId);
    
    this.userService.DeleteUser(userId).subscribe({
      next: (Response) => {
        this.userService.GetAllUsers().subscribe({
          next: (response) => {
            this.data = response;
            
          },
        })
      },
    });
  }
 


  selectedItems: number[] = [];

  itemSelectionChanged(itemId: number) {
    if (this.selectedItems.includes(itemId)) {
      this.selectedItems = this.selectedItems.filter(
        (value) => value !== itemId
      );
    } else {
      this.selectedItems.push(itemId);
    }

    this.controls.selectRolesIds.setValue(this.selectedItems);
  }
}
