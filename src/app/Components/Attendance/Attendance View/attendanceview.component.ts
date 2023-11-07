import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AttendanceService } from 'src/app/Services/attendance.service';

@Component({
  selector: 'app-attendanceview',
  templateUrl: './attendanceview.component.html',
  styleUrls: ['./attendanceview.component.css']
})
export class AttendanceviewComponent implements OnInit  {
  attendanceReport: any;
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private attendanceService: AttendanceService,) {}
  ngOnInit(): void {
    this.dtoption = {
      pagingType: 'full_numbers',
    };
    this.attendanceService.GetAllAttendance().subscribe({
      next: (Response:any) => {
        this.attendanceReport = Response;
        this.dtTrigger.next(null);
      },
    });
  }
  deleteAttendance(attendancId: number) {
    if (confirm('Are you sure to delete record')) {
      this.attendanceService.DeleteAttendance(attendancId).subscribe({
        next: () => {
          this.attendanceReport = this.attendanceReport.filter((attend: any) => attend.id != attendancId);
        },
      });
      
    }
  }
}
