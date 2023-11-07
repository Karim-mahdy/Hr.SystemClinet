import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { data } from 'jquery';
import { Subject } from 'rxjs';
import { SalaryReportService } from 'src/app/Services/salary-report.service';

@Component({
  selector: 'app-salary-reports',
  templateUrl: './salary-reports.component.html',
  styleUrls: ['./salary-reports.component.css'],
})
export class SalaryReportsComponent implements OnInit {
  Reports: any;
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  CurrentDate: Date = new Date();
  currentMonth=this.CurrentDate.getMonth()+1
  
  constructor(private SalaryService: SalaryReportService) {}
  ngOnInit(): void {
    this.dtoption = {
      pagingType: 'full_numbers',
    };
    this.SalaryService.GetAllSalaryReport().subscribe({
      next: (Response) => {
       
        this.Reports = Response;
        this.dtTrigger.next(null);
      },
    });
  }

  filtrationForm = new FormGroup({
    month: new FormControl(this.currentMonth),
    year: new FormControl(this.CurrentDate.getFullYear(), [
      Validators.pattern('[1-9]{1}[0-9]{3}'),
    ]),
  });

  get ControlsName() {
    return this.filtrationForm.controls;
  }

  OnSubmit(e: Event) {
    console.log( this.filtrationForm.value);
    e.preventDefault();
    if (this.filtrationForm.valid) {
      this.SalaryService.FilterSalaryReport(
        this.filtrationForm.value
      ).subscribe({
        next: (response) => {
          this.Reports = response;
          console.log(Response);
        },
      });
    }
  }


  
}