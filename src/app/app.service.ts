import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Title } from '@angular/platform-browser';
import { Location } from "@angular/common";
import { MatSnackBarConfig, MatSnackBar } from "@angular/material/snack-bar";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {
  Observable,
  BehaviorSubject,
  of,
  Subject,
} from "rxjs";

@Injectable()
export class AppService {
  public view$: BehaviorSubject<boolean> = new BehaviorSubject(true);

  private title = new BehaviorSubject<String>('App title');
  private title$ = this.title.asObservable();

  SharingData = new Subject();
  googleKey$: Observable<any>;
  urlPath: string;
  constructor(
    private _router: Router,
    private location: Location,
    public snackBar: MatSnackBar,
    public http: HttpClient,
    public titleService: Title
  ) {
    this.getGoogleKeySettings();
  }

  async setTitle(value) {
    let a = value.split('/')
    let title = a[a.length - 1]
    this.title.next(title);
    await this.title$.subscribe((data: any) => {
      this.titleService.setTitle(`Balhra - ${data}`)
    })

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

  getDummyData() {
    this.SharingData.next(
      {
        name: "Rohit Balhra",
        email: "rohit@gmail.com",
        phone: "1223746688",
        designation: "Software Developer"
      }
    )
  }

  getGoogleKeySettings() {
    this.googleKey$ = of({
      data: [
        {
          googleSetting: {
            key: "",
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
