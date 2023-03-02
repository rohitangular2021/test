import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../../reducers/auth.state";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthLoginService } from "../../services/auth.service";
import { AppService } from "../../../../app/app.service";
import { interval, NEVER, Observable, of, scan, shareReplay, Subject, Subscription, switchMap, withLatestFrom } from "rxjs";
import jwt_decode from "jwt-decode";

@Component({
  selector: "auth-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  selection: string = "password"
  timer$: Observable<any> | undefined;
  mobileNumber: number;
  otp: any
  password: any
  startSubject$: Subject<number> = new Subject();
  subscription$: Subscription = new Subscription();
  otpFromApi: number
  type:boolean = true
  
  adminData: any
  constructor(
    private _store: Store<any>,
    private authService: AuthLoginService,
    private appService: AppService,
    private route: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit(): void {

    this.timer$ = this.startSubject$.asObservable().pipe(
      scan((preState, state) => (preState = state)),
      shareReplay(1)
    );

    this.subscription$.add(
      interval(1000)
        .pipe(
          withLatestFrom(this.timer$),
          switchMap((values: number[]) =>
            values[1] > 0 ? of(values[1] - 1) : NEVER
          )
        )
        .subscribe((text) => this.startSubject$.next(text))
    );

  }


  logMobileNoEntered(mobileNo) {
    if (mobileNo == null || mobileNo == undefined || mobileNo.length < 10) {
      return;
    }
  }

  signUp() {
    this._router.navigate(["auth/signup"]);
  }

  checkUserWithPassword() {
    let data = {
      "phone": this.mobileNumber,
      "password": this.password
    }
    this.subscription$.add(
      this.authService.verfiyViaPassword(data).subscribe((d: any) => {
          if (d.status === 200) {
            var loginUser = jwt_decode(d.token);
            this.adminData = loginUser
            this.responseFromApi(this.adminData, d.token)
            this.appService.openSnackBar("login Successfully", 2000)
            this._router.navigate(["tracknet"]);
          }
          else {
            console.log("hii");
            this.appService.openSnackBar(d.msg, 2000)
          }
        },(err:any)=>{this.appService.openSnackBar(err.message, 2000)})
    );

  }

  responseFromApi(adminData: any, token: any) {
    localStorage.setItem('rohitapp', token)
    localStorage.setItem('name', adminData.name)
    localStorage.setItem('email', adminData.email)
    localStorage.setItem('mobile', adminData.phone)
    localStorage.setItem('id', adminData._id)
  }
  /*  */
  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

}
