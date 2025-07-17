import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload{
  id: string;
}
@Injectable({
  providedIn: 'root'
})
export class PagesService {
  public serverUrl:any =environment.serverPostUrl
  public serverFriendurl:any = environment.serverFriendUrl;

  constructor( private http: HttpClient ) { }

  createPostApiCall(payLoad:any){
    return this.http.post(`${this.serverUrl}/upload`, payLoad);
  }

  getPostApiCall(){
    return this.http.get(`${this.serverUrl}/getpost`);
  }

  deletePostApiCall(id:any){
    return this.http.delete(`${this.serverUrl}/delete/${id}`)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      // console.log('Decoded JWT:', decoded);
      return decoded.id;
    } catch (err) {
      console.error('Invalid token', err);
      return null;
    }
  }

  postLikedApiCall(id:any, payload: any){
    return this.http.patch(`${this.serverUrl}/liked/${id}`, payload);
  }

  getAllUserListApiCall(){
    return this.http.get(`${this.serverFriendurl}/getfriend`);
  }

  addFriendApiCall(payload:any){
    return this.http.post(`${this.serverFriendurl}/addfriend`, payload);
  }

  friendRequestApiCall(){
    return this.http.get(`${this.serverFriendurl}/request`);
  }

}
