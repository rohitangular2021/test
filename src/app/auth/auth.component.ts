import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { ResetErrorMsgAction } from './actions/auth.actions';
import { AuthState } from './reducers/auth.state';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authState: any;
  subscriptions$: Subscription = new Subscription;
  data: any;
  public viewType: any = "";
  constructor(private appService: AppService, private _store: Store<any>,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._store
      .select(state => state.auth)
      .subscribe((auth: AuthState) => {
        this.authState = auth;
        if (this.authState.error || this.authState.message) {
          this.appService.openSnackBar(this.authState.error ? this.authState.error : this.authState.message);
          this._store.dispatch(new ResetErrorMsgAction({}));
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptions$) {
      this.subscriptions$.unsubscribe();
    }
  }
}
