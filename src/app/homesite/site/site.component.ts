import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  signUp() {
    this._router.navigate(["auth/signup"]);
  }

  login(){
    this._router.navigate(["auth/login"]);
  }

}
