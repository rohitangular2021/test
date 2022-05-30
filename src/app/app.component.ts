import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppService } from "./app.service";
import {Router} from "@angular/router";
import { Subject, Subscription } from "rxjs";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  host: {
    "(window:resize)": "onResize($event)",
  },
})
export class AppComponent implements OnInit {
  loading: boolean;
  takeInputs$: Subject<void> = new Subject();
  urlPath:string
  private unSub$: Subscription = new Subscription();
  constructor(
    private appService: AppService,
    private _route: Router,
  ) {
    this.urlPath = window.location.href;
  }

  ngOnInit(): void {
    if(this.urlPath === "http://localhost:4200" || this.urlPath === "http://localhost:4200/")
    if(localStorage.getItem('rohitapp')){
      this._route.navigate(['/tracknet'])
    }
  }
  
   onResize(event) {
    if (event.target.innerWidth < 630) this.appService.setView(false);
    else this.appService.setView(true);
  }

}
