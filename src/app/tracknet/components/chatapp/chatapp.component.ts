import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { AccountSettingsComponent } from '../settings/account-settings/account-settings.component';
import { PrivacySettingsComponent } from '../settings/privacy-settings/privacy-settings.component';
import { SecuritySettingsComponent } from '../settings/security-settings/security-settings.component';

@Component({
  selector: 'app-chatapp',
  templateUrl: './chatapp.component.html',
  styleUrls: ['./chatapp.component.css']
})
export class ChatappComponent implements OnInit ,OnDestroy{
  component:any = PrivacySettingsComponent
  number:number = 0
  timerOne$ = timer(1000, 4000);
  interval:any
  subscription :Subscription = new Subscription()
  constructor() { } 

  ngOnInit(): void {
   this.interval= setInterval(()=>{
      this.number = Math.random()
    },1000)
  }

  changeComponent(val){
    if(val == 'security')this.component = SecuritySettingsComponent;
    if(val == 'privacy')this.component = PrivacySettingsComponent;
    if(val == 'account')this.component = AccountSettingsComponent;
  }

ngOnDestroy(): void {
  clearInterval(this.interval)
}



}
