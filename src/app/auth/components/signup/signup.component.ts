import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../../reducers/auth.state";
import { Router, ActivatedRoute } from "@angular/router";
import { SendOtpForSignupAction } from "../../actions/auth.actions";
import { AuthLoginService } from "../../services/auth.service";
import { Observable, Subject, Subscription, interval, of, NEVER } from "rxjs";
import { shareReplay, scan, withLatestFrom, switchMap } from "rxjs/operators";
import { AppService } from "../../../../app/app.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "auth-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  userName: string;
  userEmail: string;
  password:string
  newUser: any;
  signupSpinner: boolean = false;
  userMobileNumber: string;


  timer$: Observable<number>;

  startSubject$: Subject<number> = new Subject();

  subs$: Subscription = new Subscription();
  invitationId:any = null
  code: string = null
  constructor(
    public http:HttpClient,
    public authService:AuthLoginService,
    private appService: AppService,
    public _router: Router,
  ) {

  }

  ngOnInit() {
 
    this.timer$ = this.startSubject$.asObservable().pipe(
      scan((preState, state) => (preState = state)),
      shareReplay(1)
    );

    this.subs$.add(
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

  checkValidation() {
    if (
      this.userName == null ||
      this.userName.trim() == "" ||
      this.userName == undefined
    ) {
      return false;
    }
    if (
      this.userEmail == null ||
      this.userEmail == "" ||
      this.userEmail == undefined
    ) {
      return false;
    }
    if (
      this.userMobileNumber == null ||
      this.userMobileNumber == "" ||
      this.userMobileNumber == undefined
    ) {
      return false;
    }
    return true;
  }

  onCancel() {
    this._router.navigate(["auth"]);
  }

  onSignup() {
    if (this.checkValidation) {   
      this.signupSpinner = true; 
       let user= {
          email: this.userEmail,
          phone: this.userMobileNumber,
          name: this.userName,
          password:this.password
        }
      
      this.authService.signup(user).subscribe((d:any)=>{
        let data = d
        
       if(d.status == 200)
       {  
        this.signupSpinner = false;
        this.appService.openSnackBar(d.msg,5000);
        this._router.navigate([""])
       }
       else{
        this.signupSpinner = false;
        this.appService.openSnackBar(d.msg,5000);
       }
      })
  
    }
  }

  handleError = () => {
    this.signupSpinner = false;
    this.appService.openSnackBar("Unexpected error occured !");
  };



  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }
}
