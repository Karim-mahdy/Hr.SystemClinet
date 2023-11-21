import { Component, OnInit } from '@angular/core';
import { ToastService } from './Services/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hr System';

  
  constructor(private toastService: ToastService) {
    
  }
  // ngOnInit() {
  //   this.resizeWindow();
  // }
  showToastr(action: string, state: string): void {
    const message = `${action} Department ${state}`;
    const severity = state === 'done' ? 'success' : 'error';

    this.toastService.showToast(severity, 'Done', message);
  }
  // resizeWindow() {
  //   // Get the width and height of the portal
  //   const portalWidth = window.innerWidth * 0.9;
  //   const portalHeight = window.innerHeight * 0.9;

  //   // Resize the window to 90% of the portal
  //   window.resizeTo(portalWidth, portalHeight);
  // }
}
