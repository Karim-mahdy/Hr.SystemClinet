import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  flag:boolean=false
   public routeName ='';
  ToggleSidebar(){
    this.flag=!this.flag
   
  }
  
  constructor(private router :Router,private authenitivation : AuthenticationService ,public activatedRoute:ActivatedRoute ) {
   
  }
  ngOnInit(): void {
    //this.routeName = this.activatedRoute.snapshot.url[0].path;
    
    console.log(this.routeName)
  }

  Logout(){
     this.authenitivation.logout();
  }

   
}
