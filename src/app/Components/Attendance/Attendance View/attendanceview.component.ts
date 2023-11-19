import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AttendanceService } from 'src/app/Services/attendance.service';
import { data } from 'jquery';

@Component({
  selector: 'app-attendanceview',
  templateUrl: './attendanceview.component.html',
  styleUrls: ['./attendanceview.component.css'],
})
export class AttendanceviewComponent implements OnInit {
  attendanceReport: any;
  FormFilter: FormGroup = new FormGroup({
    from: new FormControl(null, [Validators.required]),
    to: new FormControl(null, [Validators.required]),
  });

  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    private attendanceService: AttendanceService,

  ) {
    const currentHours = this.currentDate
      .getHours()
      .toString()
      .padStart(2, '0');
    const currentMinutes = this.currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0');
    this.currentTime = `${currentHours}:${currentMinutes}`;
  }
  Show: boolean = false;
  employeeAttendanceId: number = 0;
  employeeList: any;
  currentDate: Date = new Date();
  currentTime: string = '';
  submitted = false;
  flag:boolean=false;
  flag2:boolean=true;
  EmployeeAttendanceForm = new FormGroup({
    id: new FormControl(0),
    date: new FormControl('',[Validators.required]),
    arrivalTime: new FormControl(this.currentTime, [Validators.required]),
    leaveTime: new FormControl(),
    selectedEmployee: new FormControl(0, [Validators.required]),
  });

  get controls() {
    return this.EmployeeAttendanceForm.controls;
  }
  minDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();

    if (month.length === 1) {
      month = '0' + month; // Add leading zero if needed
    }
    if (day.length === 1) {
      day = '0' + day; // Add leading zero if needed
    }
    return `${year}-${month}-${day}`;
  }
  ngOnInit(): void {
    this.dtoption = {
      pagingType: 'full_numbers',
    };
    this.attendanceService.GetAllAttendance().subscribe({
      next: (Response: any) => {
        this.attendanceReport = Response;
        this.EmployeeAttendanceForm.controls['date'].setValue(this.minDate());
        this.dtTrigger.next(null);
      },
    });

    this.attendanceService.GetEmployeeList().subscribe({
      next: (Response) => {
        this.employeeList = Response;
        this.EmployeeAttendanceForm.controls['date'].setValue(this.minDate());

      }
    })
  }

  // Filter 
  Submit() {
    if (this.FormFilter.valid) {
      console.log(this.FormFilter.value);
      this.attendanceService.Filter(this.FormFilter.value).subscribe({
        next: (Response: any) => {
          console.log(Response);
          this.attendanceReport = Response;
        },
        error: (error) => {
          console.error('Error filtering attendance:', error);
        },
      });
    } else {
      console.log('Form is invalid. Please fill in both dates.');
    }
  }

  // adding attendance
  OnSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    console.log(this.EmployeeAttendanceForm.value);
    console.log(this.employeeAttendanceId)
    if (this.employeeAttendanceId > 0) {
      console.log(this.employeeAttendanceId)
      this.attendanceService.EditAttendance(this.EmployeeAttendanceForm.value,this.employeeAttendanceId).subscribe({
          next: () => {
            console.log('aaa')
            this.attendanceService.GetAllAttendance().subscribe({

              next: (Response: any) => {
                this.attendanceReport = Response;
              }
            })
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
      this.OnReset();
    } else {
      console.log("aaaaaaaaaa");

      this.attendanceService
        .AddAttendance(this.EmployeeAttendanceForm.value)
        .subscribe({
          next: () => {
            this.attendanceService.GetAllAttendance().subscribe({

              next: (Response: any) => {
                this.attendanceReport = Response;
              }
            })
          },
          error: (error) => {
            console.error('Error:', error);
          },
        });
      this.OnReset();
    }
  }
  
  Toggle() {
    this.Show = true
    this.flag=false
  }

  Edit(id: any) {
    this.employeeAttendanceId = id
    this.Show = true
    this.flag=true
    this.attendanceService.GetAttendanceById(id).subscribe({
      next: (Response: any) => {
        console.log(Response)
       console.log(this.employeeAttendanceId)
        this.EmployeeAttendanceForm.controls['id'].setValue(Response.id);
        this.EmployeeAttendanceForm.controls['arrivalTime'].setValue(Response.arrivalTime);
        this.EmployeeAttendanceForm.controls['date'].setValue(Response.date);
        this.EmployeeAttendanceForm.controls['leaveTime'].setValue(Response.leaveTime);
        this.EmployeeAttendanceForm.controls['selectedEmployee'].setValue(Response.selectedEmployee);
        
      }
    })
  }

  deleteAttendance(attendancId: number) {
    if (confirm('Are you sure to delete record')) {
      this.attendanceService.DeleteAttendance(attendancId).subscribe({
        next: () => {
          this.attendanceReport = this.attendanceReport.filter(
            (attend: any) => attend.id != attendancId
          );
        },
      });
    }
  }

  OnReset() {
    this.EmployeeAttendanceForm.controls['id'].setValue(0);
    this.EmployeeAttendanceForm.controls['arrivalTime'].setValue(this.currentTime);
    this.EmployeeAttendanceForm.controls['leaveTime'].setValue('');
    this.EmployeeAttendanceForm.controls['date'].setValue(this.minDate());
    this.EmployeeAttendanceForm.controls['selectedEmployee'].setValue(0);

    this.Show = !this.Show
    this.employeeAttendanceId = 0;
    console.log(this.employeeAttendanceId)
    console.log(this.EmployeeAttendanceForm.value);
  }
}