import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { EmployeeService } from 'src/app/Services/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeviewComponent {
  employees: any;
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.dtoption = {
      pagingType: 'full_numbers',
    };
    this.employeeService.GetAllEmployee().subscribe({
      next: (Response:any) => {
        
        this.employees = Response;
        this.dtTrigger.next(null);
      },
    });
  }

  deletemp(employeeId: number) {
    console.log(employeeId)
    if (confirm('Are you sure to delete record')) {
      this.employeeService.DeleteEmployee(employeeId).subscribe({
        next: () => {
          this.employees = this.employees.filter((emp: any) => emp.id != employeeId);
        },
      });
      
    }
  }
}
