import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { debounceTime, Subscription } from 'rxjs';
import { FetchSettingsAction } from '../../actions/tracknet.settings.actions';
import { SettingSelector } from '../../reducers/settings.sectector';
import { TracketService } from '../../services/tracket.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  changeView:string = 'account'
  subscriptions$: Subscription = new Subscription();
  constructor() { }

  ngOnInit(): void {
  
  }

}
