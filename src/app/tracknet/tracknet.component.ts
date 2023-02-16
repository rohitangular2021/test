import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription,debounceTime } from 'rxjs';
import { FetchSettingsAction } from './actions/tracknet.settings.actions';
import { SettingSelector } from './reducers/settings.sectector';
import { TracketService } from './services/tracket.service';

declare var deferredPrompt: any;
@Component({
  selector: 'app-tracknet',
  templateUrl: './tracknet.component.html',
  styleUrls: ['./tracknet.component.css']
})
export class TracknetComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  subscriptions$: Subscription = new Subscription();
  isExpanded = true;
  loading: boolean =  false; 
  headerName:string = ""
  elem:any
  constructor(
    private store:Store,
    @Inject(DOCUMENT) private document: any,
    public service:TracketService,
    public router:Router) { } 

  ngOnInit(): void {
   this.elem = document.documentElement;
   this.store.dispatch(new FetchSettingsAction())
   
   setTimeout(() => {
    this.subscriptions$.add(
      this.store
        .select(SettingSelector)
        .pipe(debounceTime(100))
        .subscribe((settings: any) => {
            this.service.checksettings(settings)
        })
    );
  }, 2000);
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
