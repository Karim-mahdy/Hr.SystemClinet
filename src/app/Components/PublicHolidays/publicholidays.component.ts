import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PublicholidaysService } from 'src/app/Services/publicholidays.service';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-publicholidays',
  templateUrl: './publicholidays.component.html',
  styleUrls: ['./publicholidays.component.css']
})
export class PublicholidaysComponent implements OnInit {
  dtoption: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(
    public publicholidaysService: PublicholidaysService,
   
    
  ){}
 
  submitted: boolean = false;
  publicHolidays:any;
  publicHolidayId:any;
  ModelState:any ;
  PublicHolidyFrom = new FormGroup({
    id:new FormControl(0),
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(2),
    ]),
    data: new FormControl('', [
      Validators.required,
    ])
  });
  ngOnInit(): void {
    this.publicholidaysService.GetAllPublicholidys().subscribe({
      next: (response) => {
        this.publicHolidays = response;
        this.dtTrigger.next(null);
      },
    })
    this.dtoption = {
      pagingType: 'full_numbers',
    };
    
  }

}
