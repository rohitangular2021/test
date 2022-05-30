import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

declare var deferredPrompt: any;
@Component({
  selector: 'app-tracknet',
  templateUrl: './tracknet.component.html',
  styleUrls: ['./tracknet.component.css']
})
export class TracknetComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  loading: boolean =  false; 
  headerName:string = ""
  elem:any
  constructor(
    @Inject(DOCUMENT) private document: any,
    public router:Router) { }

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  goToDashboardView(name) {
    this.headerName = name;
    this.router.navigate(["tracknet/dashboard"]);
  }

  goToUserView(name) {
    this.headerName = name;
    this.router.navigate(["tracknet/users"]);
  }

  goToStudetView(name) {
    this.headerName = name;
    this.router.navigate(["tracknet/students"]);
  }

  maxminSide(event){
    this.isExpanded = event
  }

  fullScreen(value){
    if(value==='open'){
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    }
    if(value==='close'){
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
 
  }

}
