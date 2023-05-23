import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, from, fromEvent, map, of } from 'rxjs';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  @ViewChild("search", { static: false }) search: ElementRef;
  constructor(private _router:Router) { }
  
  ngOnInit() {
  }

  signUp() {
    this._router.navigate(["auth/signup"]);
  }

  login(){
    this._router.navigate(["auth/login"]);
  }

  Shop(){
    this._router.navigate(["shoping"]);
  }
  

}
