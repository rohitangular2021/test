import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import data from '../../../../assets/data.json'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  @Output()  onItemSelected = new EventEmitter<any>();
  @Input() isExpanded = true;
  showSubmenu: boolean = true;
  selectedItem:string 
  urlPath:any = ''
  isShowing = false;
  showChild:boolean = false
  navbar:any=[]
  constructor(private router: Router,) {
    this.urlPath = window.location.href;
   }

  ngOnInit(): void {    
    this.navbar = data
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        let url = val.url;
      }
    });
  }


  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  trackByIdx(index: number): any {
    return index;
  }
  
  showOpenChild(item,indexi){
   this.navbar[indexi].isShowChild = !this.navbar[indexi].isShowChild
   this.navbar.map((item,index)=>{
     if(index !== indexi){
       item.isShowChild = false
     }    
   })  
  }

  hideall()
  {
    this.showSubmenu = !this.showSubmenu
  } 
  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}
