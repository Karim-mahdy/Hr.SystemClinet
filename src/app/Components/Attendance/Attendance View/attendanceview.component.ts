import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/Services/attendance.service';

@Component({
  selector: 'app-attendanceview',
  templateUrl: './attendanceview.component.html',
  styleUrls: ['./attendanceview.component.css']
})
export class AttendanceviewComponent implements OnInit  {
  attendancereport: any;
  constructor(private attser: AttendanceService,) {}
  ngOnInit(): void {
    this.attser.GetAllAttendance().subscribe({
      next: () => {
        this.attendancereport = Response;
      },
    });
  }
}
