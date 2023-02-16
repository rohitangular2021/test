import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';
import { FetchDashboardAction } from '../../actions/tracknet.dahboard.actions';
import { DashboardSelector } from '../../reducers/dashboard.selector';
import { TracketService } from '../../services/tracket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dashboardData: any
  subscriptions$: Subscription = new Subscription();
  spinner: boolean = true
  
  constructor(public ts: TracketService, private store: Store) { }

  ngOnInit(): void {

    this.ts.settings.subscribe(data => {
    
    })


    this.store.dispatch(new FetchDashboardAction())
    setTimeout(() => {
      this.subscriptions$.add(
        this.store
          .select(DashboardSelector)
          .pipe(debounceTime(100))
          .subscribe((allstudents: any) => {
            this.dashboardData = allstudents.data
            this.spinner = false
          })
      );
    }, 2000);
  }

}
