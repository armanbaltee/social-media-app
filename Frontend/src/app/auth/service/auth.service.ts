import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url:any = environment.serverUserUrl

  constructor(private http: HttpClient) { }

  loginApiCall(payLoad: any){
    return this.http.post(`${this.url}/login`, payLoad)
  }

  signupApiCall(payLoad:any){
    return this.http.post(`${this.url}/signup`, payLoad)
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
