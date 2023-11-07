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
    id: new FormControl(0),
    name: new FormControl('', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]),
    date: new FormControl('', Validators.required)
  });
  
  get controls() {
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
      if (this.publicHolidayId > 0) {
        this.publicholidaysService.EditPublicholidy(this.PublicHolidyFrom.value, this.publicHolidayId).subscribe({
          next: (res) => {
            this.publicholidaysService.GetAllPublicholidys().subscribe({
              next: (response) => {
                this.publicHolidays = response;
             
              },
            })
          },
          error:(error:any)=>{  
            this.ModelState = error.error;
          }
        });
        this.OnReset()

      }
      else {
        console.log(this.PublicHolidyFrom.value)
        this.publicholidaysService.AddPublicholidy(this.PublicHolidyFrom.value).subscribe({
          next: () => {
            this.publicholidaysService.GetAllPublicholidys().subscribe({
              next: (response) => {
                this.publicHolidays = response;
                
              },
            })
          },
          error:(error:any)=>{  
            this.ModelState = error.error;
          }

        });
        this.OnReset();
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
        this.PublicHolidyFrom.controls['date'].setValue(response.date);

      },
     
      
    })
     
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
        this.PublicHolidyFrom.controls['date'].setValue('');

        this.publicHolidayId = 0;
  }

  minDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    let month = (today.getMonth() + 1).toString();
    let day = (today.getDate()+1).toString();
  
    if (month.length === 1) {
      month = '0' + month; // Add leading zero if needed
    }
    if (day.length === 1) {
      day = '0' + day; // Add leading zero if needed
    }
  
    return `${year}-${month}-${day}`;
  }
  

}