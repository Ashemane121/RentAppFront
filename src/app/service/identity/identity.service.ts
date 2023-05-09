import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/identities'

  GetAllIdentities(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}`, { headers });
  }

  GetIdentityById(identityId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/${identityId}`, { headers });
  }

  GetIdentitiesByUserId(userId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/user/${userId}`, { headers });
  }

  AddIdentity(userId: any, identity: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiurl}/${userId}`, identity, { headers });
  }

  UpdateIdentity(identityId: any, identity: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiurl}/${identityId}`, identity, { headers });
  }

  DeleteIdentity(identityId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/${identityId}`, { headers });
  }
  
}
