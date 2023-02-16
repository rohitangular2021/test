import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-security-settings',
  templateUrl: './security-settings.component.html',
  styleUrls: ['./security-settings.component.css']
})
export class SecuritySettingsComponent implements OnInit {
  data1:any 

  constructor(private appService:AppService) {
    this.appService.getDummyData()
  }

  ngOnInit(): void {   
    this.appService.SharingData.subscribe(data=>{
      this.data1 = data
      console.log(this.data1);  
    })
  }



}
