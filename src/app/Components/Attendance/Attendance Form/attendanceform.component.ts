import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendanceform',
  templateUrl: './attendanceform.component.html',
  styleUrls: ['./attendanceform.component.css']
})
export class AttendanceformComponent  {
  submitted = false;

  Employee=new FormGroup({
   
    date:new FormControl('',[Validators.required]),
    ArrivalTime:new FormControl('',[Validators.required]),
    LeaveTime:new FormControl('',[Validators.required,Validators.email]),
    SelectedOption:new FormControl('',[Validators.required])
  })

  get controls() { return this.Employee.controls; }
  

  OnSubmit() {
    this.submitted = true;
  }
}
