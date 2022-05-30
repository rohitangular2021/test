import { Injectable } from '@angular/core';

import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpResponse, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})

export class IntercepterService {

  constructor(private http: HttpClient,private appService:AppService , private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('rohitapp')  
  
    if (token) {
      return next.handle(req.clone({ headers: req.headers.set('Authorization',token) }))
      .pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && ~(event.status / 100) > 3)
            return event;
          else return event
        }),
        catchError((err: any, caught:any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              localStorage.removeItem('rohitapp')
              localStorage.removeItem('name')
              localStorage.removeItem('email')
              localStorage.removeItem('mobile')
              localStorage.removeItem('id')
              this.appService.openSnackBar('Session Expired ! Login Again',5000)
                this.router.navigate(['/auth']);          
            } 
            return throwError(err); 
          } 
          else{
            // this.router.navigate(['/auth']);
            return throwError(err);
          }
        }) 
      );
    }
    else {
      return next.handle(req);
    }
  }
}