import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthLoginService {

  constructor(private httpClient: HttpClient) { }

  public verfiyViaPassword(reqObj: any) {
    return this.httpClient.post(`http://localhost:3000/api/auth/login`, reqObj, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }

  public signup(obj: any) {
    return this.httpClient.post(`http://localhost:3000/api/auth/signup`, obj, {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    });
  }


}
