import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
