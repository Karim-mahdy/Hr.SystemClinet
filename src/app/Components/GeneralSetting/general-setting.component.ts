import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralsettingService } from 'src/app/Services/general-settings.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css']
})
export class GeneralSettingComponent implements OnInit {
  GeneralSetting = new FormGroup({
    overtimeHour: new FormControl(0,[Validators.required, Validators.min(0)]),
    discountHour: new FormControl(0,[Validators.required, Validators.min(0)]),
    
    id: new FormControl(0),
    empid: new FormControl(),
    weekends: new FormControl(),
  });
 
  setting:any
  formBuilder: any;
  flag:boolean = false;
  generalSettingId:number =0;
  ModelState: any;
  flag2:boolean = true;

  get ControlName(){
    return this.GeneralSetting.controls
  }
  constructor(private generalsettings:GeneralsettingService) {
    
  }
 
  ngOnInit(): void {
    
   this.generalsettings.GetAllGeneralSetting().subscribe({
    next:(response:any)=>{
     
      if(response.id!=0){
        console.log(response);
        
        this.generalSettingId = response.id;
        this.setting=response
        this.GeneralSetting.controls['id'].setValue(this.setting.id);
        this.GeneralSetting.controls['overtimeHour'].setValue(this.setting.overtimeHour);
        this.GeneralSetting.controls['discountHour'].setValue(this.setting.discountHour);
        this.flag2 =false
        this.flag=true
        
      }
      else{
         console.log(response);
         this.setting=response
        this.flag2 =true
        this.flag=false
        
      }
    }
   })

   
  }
 
  show:boolean = false
  ShowEmployees(){
    this.show =!this.show
   
     
  }
  selectemployee(){
    this.generalsettings.GetEmployeeGeneralSettingById(this.ControlName.empid.value).subscribe({
      next:(response:any)=>{
         
       
        if(response.id == 0){
          this.flag = false
          this.flag2 =true
        }
        else{
          this.flag = true
          this.flag2 =false
        }
        this.generalSettingId = response.id;
        this.setting=response
        this.FillFormWithData()
      }
      
    })
    
  }

  
  FillFormWithData(){
    this.GeneralSetting.controls['id'].setValue(this.setting.id);
    this.GeneralSetting.controls['empid'].setValue(this.setting.empid);
    this.GeneralSetting.controls['overtimeHour'].setValue(this.setting.overtimeHour);
    this.GeneralSetting.controls['discountHour'].setValue(this.setting.discountHour);
  }

  OnSubmit(e: Event) {
  
    console.log(this.GeneralSetting.value);
    console.log(this.generalSettingId);
    e.preventDefault();
     
    
    this.generalsettings.AddGeneralSetting(this.GeneralSetting.value).subscribe({
      next:(response:any)=>{
        console.log(response);
        if(response.empid!=null){
            this.generalsettings.GetEmployeeGeneralSettingById(this.ControlName.empid.value).subscribe({
              next:(response:any)=>{
                 
               
                if(response.id == 0){
                  this.flag = false
                  this.flag2 =true
                }
                else{
                  this.flag = true
                  this.flag2 =false
                }
              //  this.generalSettingId = response.id;
                this.setting=response
                this.FillFormWithData()
              }
              
            })
           
        }else{
        this.generalsettings.GetAllGeneralSetting().subscribe({
          next:(response:any)=>{
            this.setting=response
            this.generalSettingId = response.id;
            if(response.id!=0 &&response.empid==null){
              this.flag2=false
              this.flag=true
            }
          }
        })}
      },
      error:(error:any)=>{  
        this.ModelState = error.error;
      }
    })
    
    this.ResetFormWithData();
  }
  
  onDelete(id:number){
    console.log(id);
   this.generalsettings.DeleteGeneralSetting(id).subscribe({
     next:()=>{
      this.generalsettings.GetAllGeneralSetting().subscribe({
        next:(response:any)=>{
          this.setting=response
          console.log(response);
          if(response.id==0 &&response.empid==null){
            this.flag2=true
            this.flag=false
            this.ResetFormWithData();
          }
        }
      })
     },
     error:(error:any)=>{  
      this.ModelState = error.error;
    }
   })
  
   
  }
  onEdit(id:number){
    console.log(id);
    this.generalsettings.EditGeneralSetting(this.GeneralSetting.value,id).subscribe({
      next: (response:any) => {
        console.log(response);
        this.GeneralSetting.controls['id'].setValue(response.id);
        this.GeneralSetting.controls['empid'].setValue(response.empid);
        this.GeneralSetting.controls['overtimeHour'].setValue(response.overtimeHour);
        this.GeneralSetting.controls['discountHour'].setValue(response.discountHour);
      },
      error: (error) => {
        console.error('Error:', error); // Handle error response if needed
      }
    })
  }
  ResetFormWithData(){
    
    this.GeneralSetting.controls['id'].setValue(0);
    this.GeneralSetting.controls['empid'].setValue(0);
    this.GeneralSetting.controls['overtimeHour'].setValue(0);
    this.GeneralSetting.controls['discountHour'].setValue(0);
    this.generalSettingId = 0;
  }

  array: { displayValue: string; isSelected: boolean }[] = [];
  
  itemSelectionChanged(day: { displayValue: string; isSelected: boolean }, e: Event) {
    // Ensure that the event target is an HTMLInputElement (i.e., a checkbox)
    const checkbox = e.target as HTMLInputElement;
  
    if (checkbox.type === 'checkbox') {
      day.isSelected = checkbox.checked; // Update the isSelected property based on the checkbox's checked state
  
      const existingDay = this.array.find((d) => d.displayValue === day.displayValue);
  
      if (!existingDay) {
        // If the day is not in the array, add it
        this.array.push({ displayValue: day.displayValue, isSelected: day.isSelected });
      } else {
        // If the day is already in the array, update its isSelected property
        existingDay.isSelected = day.isSelected;
      }
  
      // Update the 'weekends' control in the form
      this.GeneralSetting.controls['weekends'].setValue(this.array);
      console.log(this.array);
      
    }
  }
  
  
  }
  
  
  
