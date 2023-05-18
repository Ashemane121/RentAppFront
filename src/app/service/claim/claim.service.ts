import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/claims'

  GetAllClaims(token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(this.apiurl, { headers });
  }

  GetClaimById(claimId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/${claimId}`, { headers });
  }

  GetClaimsByPostId(postId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/post/${postId}`, { headers });
  }

  GetClaimByRentalId(rentalId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/rental/${rentalId}`, { headers });
  }

  AddClaim(rentalId: any, claim: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiurl}/${rentalId}`, claim, { headers });
  }

  UpdateClaim(claimId: any, claim: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiurl}/${claimId}`, claim, { headers });
  }

  DeleteClaim(claimId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/${claimId}`, { headers });
  }

}
