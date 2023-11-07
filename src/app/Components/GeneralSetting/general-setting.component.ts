import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralsettingService } from 'src/app/Services/general-settings.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {
  GeneralSetting = new FormGroup({
    overtimeHour: new FormControl('',[Validators.required, Validators.min(0)]),
    discountHour: new FormControl('',[Validators.required, Validators.min(0)]),
    
    id: new FormControl(0),
    empid: new FormControl(''),
  });
 
  setting:any

  get ControlName(){
    return this.GeneralSetting.controls
  }
  constructor(private generalsettings:GeneralsettingService) {
   
  }
  // toggle:boolean=false
  ngOnInit(): void {
  
   this.generalsettings.GetAllGeneralSetting().subscribe({
    next:(response)=>{
      
      if(response!=null){
        // this.toggle=true
        this.setting=response
      
      }
    }
   })
  }

  selectemployee(){
    this.generalsettings.GetEmployeeGeneralSettingById(this.ControlName.empid.value).subscribe({
      next:(response)=>{
        console.log(response)
        this.setting=response
      }
    })
  }
  // selectedDays: any[] = [];

  updateSelectedDays() {
    this.setting.weekends = this.setting.weekends.filter((day:any) => day.isSelected);
  }
}