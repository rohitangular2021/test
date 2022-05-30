import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  constructor( private location: Location ) { 
  }

  ngOnInit(): void {
  }

goBack() {
    this.location.back();
}

}
