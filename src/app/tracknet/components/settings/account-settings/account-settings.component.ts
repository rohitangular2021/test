import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  item: any={
    id:3,
    name:'Rohit Balhra',
    designation:'developer',
    dept:'IT',
    status:'active'
  }
  editMode: any = false;
  constructor(private activatdRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatdRoute.paramMap.subscribe(param => {
      let pid = +param.get('id') // (+) Converts string 'id' to number

    })
  }

}
