import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output()showSidenav = new EventEmitter<any>();
   isShow: boolean = true;
   fScreen:string="closeFullScreen"
  @Input() isExpand: boolean = true;
  orgLogo = ""
  @Output() fullScreenobj = new EventEmitter<any>();
  @Output() showSidenavMobile = new EventEmitter<any>();
  showMobileNav: boolean = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  logout()
  {
    localStorage.removeItem('rohitapp')
    this.router.navigate(["auth"])
  }

  sidenavToggle() {
    this.isShow = !this.isShow;
    this.showSidenav.emit(this.isShow);
  }

  fullScreen()
  {
    this.fScreen = "fullScreen"
    this.fullScreenobj.emit("open")
  }

  ClosefullScreen(){ 
    this.fScreen = "closeFullScreen"
    this.fullScreenobj.emit("close")
   }

}
