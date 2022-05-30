import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AppService } from './app.service';
import { AuthLoginService } from './auth/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   statusToken:any
  constructor(private http: HttpClient,
    private appService: AppService,
    private authService: AuthLoginService, private router: Router) { }
  canActivate():boolean { 
    let token = localStorage.getItem('rohitapp')
    if (token) {      
       this.callApi(token).then(()=>{return true}).catch(()=>{return false})
       return true
    }
    else{return false}
  }
  
  callApi=function(token){
    return new Promise((resolve,reject)=>{ 
      this.authService.verifyToken(token).subscribe((d:any)=>{
      if(d.status == 200) resolve(true); else reject(false)
      })
    })
      
    }


}
