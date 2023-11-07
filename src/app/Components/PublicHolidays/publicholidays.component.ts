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
      Validators.minLength(2),]),
    data: new FormControl('', [
      Validators.required,
    ])
  });
  get controlsname() {
    return this.PublicHolidyFrom.controls;
  }
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

  OnSubmit(e: Event) {
    e.preventDefault();
    this.submitted = true;
    if (this.PublicHolidyFrom.valid) {
      if (this.publicHolidayId != undefined) {
        this.publicholidaysService.EditPublicholidy(this.PublicHolidyFrom.value, this.publicHolidayId).subscribe({
          next: (res) => {
            this.publicholidaysService.GetAllPublicholidys().subscribe({
              next: (response) => {
                this.publicHolidays = response;
                this.dtTrigger.next(null);
              },
            })
          },
          error:(error:any)=>{  
            this.ModelState = error.error;
          }
        });
      }
      else {
        this.publicholidaysService.AddPublicholidy(this.PublicHolidyFrom.value).subscribe({
          next: () => {
            this.publicholidaysService.GetAllPublicholidys().subscribe({
              next: (response) => {
                this.publicHolidays = response;
                this.dtTrigger.next(null);
              },
            })
          },
          error:(error:any)=>{  
            this.ModelState = error.error;
          }
        });
      }
    } 
  }

  OnEdit(id:any){
    console.log(id);
    
    this.publicHolidayId = id;
    this.publicholidaysService.GetPublicholidyId(id).subscribe({
      next: (response:any) => {
        console.log(response);
       this.PublicHolidyFrom.controls['id'].setValue(response.id);
        this.PublicHolidyFrom.controls['name'].setValue(response.name);
        this.PublicHolidyFrom.controls['data'].setValue(response.data);
      },
     
      
    })
    console.log( this.PublicHolidyFrom);
  }

  OnDelete(id:any){
    this.publicholidaysService.DeletePublicholidy(id).subscribe({
      next: () => {
        this.publicholidaysService.GetAllPublicholidys().subscribe({
          next: (response) => {
            this.publicHolidays = response;
            
          },
        })
      },
    })
  }

  OnReset() {
        this.PublicHolidyFrom.controls['id'].setValue(0);
        this.PublicHolidyFrom.controls['name'].setValue('');
        this.PublicHolidyFrom.controls['data'].setValue('');
        this.publicHolidayId = 0;
  }
}
