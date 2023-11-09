import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  flag:boolean=false
  flag2:boolean=true
   public routeName ='';
   userName:any
  ToggleSidebar(){
    this.flag=!this.flag
   
  }
  
  constructor(private router :Router,private authenitivation : AuthenticationService ,public activatedRoute:ActivatedRoute ) {
   
  
  }
  name: string | undefined;
  ngOnInit(): void {
    const completeUrl = window.location.href;
console.log(completeUrl);

if (completeUrl.includes('/Dashboard') && !completeUrl.includes('/', completeUrl.indexOf('/Dashboard') + 1)) {
  this.flag2 = true;
} else {
  this.flag2 = false;
}

    
    let token: string = localStorage.getItem('jwt') ?? "";
    let decodedToken: any = jwtDecode(token);
    console.log(decodedToken);
    for (let key in decodedToken) {
      if (key.includes('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name')) {
        this.name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        break;
      }
    }
  
    console.log(name);
  }
  

  Logout(){
     this.authenitivation.logout();
  }

   
}
