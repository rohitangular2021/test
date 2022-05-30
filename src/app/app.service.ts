import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Location } from "@angular/common";
import { MatSnackBarConfig, MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {
  Observable,
  BehaviorSubject,
  ReplaySubject,
  Subject,
  of,
  iif,
  from,
  Subscription,
} from "rxjs";
import { mergeMap, pluck, shareReplay } from "rxjs/operators";
declare var jwt_decode: any;

@Injectable()
export class AppService {
  public view$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  googleKey$: Observable<any>;
  constructor(
    private _router: Router,
    private location: Location,
    public snackBar: MatSnackBar,
    public http: HttpClient
  ) {
    this.getGoogleKeySettings();
  }

  decodeQueryParam(value) {
    if (value) {
      if (value.indexOf("%") == -1) {
        return JSON.parse(window.atob(value));
      } else {
        return JSON.parse(window.atob(value.substring(0, value.indexOf("%"))));
      }
    }
  }

  setView(value) {
    this.view$.next(value);
  }

  getView(): Observable<boolean> {  
    return this.view$.asObservable();
  }


  getLocalAppState(): any {
    try {
      return localStorage.getItem("rohitapp");
    } catch (error) {
      // console.log("Exception occured while parsing token and token is" + localStorage.getItem("app"))
      // localStorage.removeItem("app");
      // this._router.navigate(["/auth"]);
    }
  }

 openSnackBar(message: string, duration: number = 8000) {
    this.snackBar.open(message, "OK", <MatSnackBarConfig>{
      duration: duration,
    });
  }

  getToken(): string {
    const token = localStorage.getItem("rohitapp");
    return token;
  }


  getGoogleKeySettings() {
    this.googleKey$ = of({
      data: [
        {
          googleSetting: {
            key: "AIzaSyBPVb354ebi6NytQcejugJnSFfO0zu6_rc",
          },
          moduleName: "ORGANISATION",
          mapType: "GOOGLE",
          type: "GOOGLE_MAP_KEY",
        },
      ],
      error: null,
      status: 200,
    });
    }

   
    
}
