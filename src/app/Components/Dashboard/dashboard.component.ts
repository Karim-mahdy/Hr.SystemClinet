import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  flag:boolean=false
  ToggleSidebar(){
    this.flag=!this.flag
  }
  
  constructor() {
   
  }

   
}
