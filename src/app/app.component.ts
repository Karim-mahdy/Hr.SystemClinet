import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HrSystemClinet';

  ngOnInit() {
    this.resizeWindow();
  }

  resizeWindow() {
    // Get the width and height of the portal
    const portalWidth = window.innerWidth * 0.9;
    const portalHeight = window.innerHeight * 0.9;

    // Resize the window to 90% of the portal
    window.resizeTo(portalWidth, portalHeight);
  }
}
