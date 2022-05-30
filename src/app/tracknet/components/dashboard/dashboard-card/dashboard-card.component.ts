import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {


  @Input() dashboardData
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  openClick()
  {
  
  }

}
