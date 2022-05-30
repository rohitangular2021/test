import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient, private appService: AppService) { }

  public callService(
    methodType: string,
    body: any = null,
    path: string
  ): any {
    let headers = new HttpHeaders({
      authorization: "Bearer " + this.appService.getToken(),
    });

    if (methodType === "get") {
      return this.httpClient.get(path, { headers: headers });
    }

    if (methodType === "post") {
      return this.httpClient.post(path, body, { headers: headers });
    }

    if (methodType === "put") {
      return this.httpClient.put(path, body, { headers: headers });
    }

    if (methodType === "delete") {
      return this.httpClient.delete(path, { headers: headers });
    }
  }

}
