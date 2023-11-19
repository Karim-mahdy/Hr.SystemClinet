import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralsettingService } from 'src/app/Services/general-settings.service';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.css'],

})
export class GeneralSettingComponent implements OnInit {
  GeneralSetting = new FormGroup({
    id: new FormControl(0),
    empid: new FormControl(),
    overtimeHour: new FormControl(0, [Validators.required, Validators.min(0)]),
    discountHour: new FormControl(0, [Validators.required, Validators.min(0)]),
    weekends: new FormControl(),
  });

  setting: any
  flag: boolean = false;
  generalSettingId: number = 0;
  ModelState: any;
  flag2: boolean = true;
  show: boolean = false
 
  //array: { displayValue: string; isSelected: boolean }[] = [];
    
  deletedelement: any;
  //array of days
  array = [
    { displayValue: 'Saturday', isSelected: false },
    { displayValue: 'Sunday', isSelected: false },
    { displayValue: 'Monday', isSelected: false },
    { displayValue: 'Tuesday', isSelected: false },
    { displayValue: 'Wednesday', isSelected: false },
    { displayValue: 'Thursday', isSelected: false },
    { displayValue: 'Friday', isSelected: false },
  ]
  get ControlName() {
    return this.GeneralSetting.controls
  }
  constructor(private generalsettings: GeneralsettingService) { }

  ngOnInit(): void {

    this.generalsettings.GetAllGeneralSetting().subscribe({
      next: (response: any) => {

        if (response.id != 0) {
          console.log(response);

          this.generalSettingId = response.id;
          this.setting = response;
          this.GeneralSetting.controls['id'].setValue(this.setting.id);
          this.GeneralSetting.controls['overtimeHour'].setValue(this.setting.overtimeHour);
          this.GeneralSetting.controls['discountHour'].setValue(this.setting.discountHour);
          this.flag2 = false
          this.flag = true

        }
        else {
          console.log(response);
          this.setting = response
          this.flag2 = true
          this.flag = false

        }
      }
    })


  }

  ShowEmployees() {
    this.show = !this.show
  }
  selectemployee() {
    this.generalsettings.GetEmployeeGeneralSettingById(this.ControlName.empid.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.id == 0) {
          this.flag = false;
          this.flag2 = true;
          this.resetDataForSpcial();
          this.GeneralSetting.controls['empid'].setValue(response.empid);
        } else {
          this.flag = true;
          this.flag2 = false;
          this.GeneralSetting.controls['id'].setValue(response.id);
          this.GeneralSetting.controls['empid'].setValue(response.empid);
          this.GeneralSetting.controls['overtimeHour'].setValue(response.overtimeHour);
          this.GeneralSetting.controls['discountHour'].setValue(response.discountHour);
          this.setting.weekends = null;
          this.setting.weekends = response.weekends;
           
          this.generalSettingId = response.id;

        }

      }
    });

  }



  OnSubmit(e: Event) {
    console.log(this.GeneralSetting.value);
    console.log(this.generalSettingId);
    e.preventDefault();

    this.generalsettings.AddGeneralSetting(this.GeneralSetting.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.empid != 0) {
          this.generalsettings.GetEmployeeGeneralSettingById(response.empid).subscribe({
            next: (response: any) => {
              if (response.id == 0) {
                this.flag = false;
                this.flag2 = true;
              } else {
                this.flag = true;
                this.flag2 = false;
              }
              this.generalSettingId = response.id;
              this.GeneralSetting.controls['id'].setValue(response.id);
              this.GeneralSetting.controls['empid'].setValue(response.empid);
              this.GeneralSetting.controls['overtimeHour'].setValue(response.overtimeHour);
              this.GeneralSetting.controls['discountHour'].setValue(response.discountHour);
              this.setting.weekends = null;
              this.setting.weekends = response.weekends;
              console.log(this.setting);

            }
          });
        }
        else {
          this.generalsettings.GetAllGeneralSetting().subscribe({
            next: (response: any) => {
          
              this.setting = response;
              this.GeneralSetting.controls['overtimeHour'].setValue(response.overtimeHour);
              this.GeneralSetting.controls['discountHour'].setValue(response.discountHour); 
              this.generalSettingId = response.id;
              if (response.id != 0 && response.empid == null) {
                this.flag2 = false;
                this.flag = true;
              }

            }
          });
        }
      },
      error: (error: any) => {
        this.ModelState = error.error;
      }
    });

    this.ResetFormWithData();
  }

  updateArrayWithNewData() {
    this.array = this.setting.weekends.map((day: Weekday) => ({
      displayValue: day.displayValue,
      isSelected: day.isSelected
    }));

   // this.GeneralSetting.controls['id'].setValue(this.setting.id);
    this.GeneralSetting.controls['weekends'].setValue(this.array);
    console.log(this.array);
  }

  onEdit(id: number) {
    console.log(id);
    this.updateArrayWithNewData()
    console.log(this.GeneralSetting.value);
    this.generalsettings.EditGeneralSetting(this.GeneralSetting.value, id).subscribe({
      next: (response: any) => {
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

  onDelete(id: number ) {
     
    this.generalsettings.DeleteGeneralSetting(id).subscribe({
      next: () => {
          this.resetDataForSpcial();
          this.flag2 = true
         
      },
      error: (error: any) => {
        this.ModelState = error.error;
      }
    })

  }


  itemSelectionChanged(day: { displayValue: string; isSelected: boolean }, e: Event) {
    // Ensure that the event target is an HTMLInputElement (i.e., a checkbox)
    const checkbox = e.target as HTMLInputElement;

    if (checkbox.type === 'checkbox') {
      day.isSelected = checkbox.checked; // Update the isSelected property based on the checkbox's checked state

      // Check if the day is already in the array
      const existingDay = this.array.find((d) => d.displayValue === day.displayValue);

      if (!existingDay) {
        // If the day is not in the array, add it
        this.array.push({ displayValue: day.displayValue, isSelected: day.isSelected });
      } else {
        // If the day is already in the array, update its isSelected property
        existingDay.isSelected = day.isSelected;
      }

     this.GeneralSetting.controls['weekends'].setValue(this.array);
    }
   
    console.log('Updated array:', this.array);
    console.log('Form value:', this.GeneralSetting.value);
  }

  ResetFormWithData() {
    this.GeneralSetting.controls['id'].setValue(0);
    this.GeneralSetting.controls['empid'].setValue(0);
    this.GeneralSetting.controls['overtimeHour'].setValue(0);
    this.GeneralSetting.controls['discountHour'].setValue(0);
    this.generalSettingId = 0;

    // Set all isSelected values in the array to false
    this.array.forEach(day => day.isSelected = false);

    // Update the 'weekends' control in the form
    this.GeneralSetting.controls['weekends'].setValue(this.array);
  }

  resetFormAndShowEmployees() {
    this.resetDataForSpcial();
    this.ShowEmployees();
  }
  resetDataForSpcial() {

    this.GeneralSetting.controls['id'].setValue(0);
    this.GeneralSetting.controls['empid'].setValue(null);
    this.GeneralSetting.controls['overtimeHour'].setValue(0);
    this.GeneralSetting.controls['discountHour'].setValue(0);
    this.generalSettingId = 0;
    
    this.setting.weekends = this.array = [
      { displayValue: 'Saturday', isSelected: false },
      { displayValue: 'Sunday', isSelected: false },
      { displayValue: 'Monday', isSelected: false },
      { displayValue: 'Tuesday', isSelected: false },
      { displayValue: 'Wednesday', isSelected: false },
      { displayValue: 'Thursday', isSelected: false },
      { displayValue: 'Friday', isSelected: false }
    ];
    this.flag = false;

  }
  cancelAddCustomSettings() {

    this.generalsettings.GetAllGeneralSetting().subscribe({
      next: (response: any) => {
        if (response.id != 0) {
          console.log(response);
          this.generalSettingId = response.id;
          this.setting = response;
          this.GeneralSetting.controls['id'].setValue(this.setting.id);
          this.GeneralSetting.controls['overtimeHour'].setValue(this.setting.overtimeHour);
          this.GeneralSetting.controls['discountHour'].setValue(this.setting.discountHour);
          this.GeneralSetting.controls['empid'].setValue(null);
          this.flag2 = false;
          this.flag = true;
          this.show = false;
        }
        else {
          this.resetDataForSpcial()
          this.flag2 = true;
          this.flag = false;
          this.show = false;

        }
      }
    });


  }

}

interface Weekday {
  displayValue: string;
  isSelected: boolean;
}