import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api'
  
  // Requests apis

  GetAllRequests(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/requests`);
  }

  GetRequestById(requestId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/requests/${requestId}`, { headers });
  }

  GetRequestsByUserId(userId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/requests/user/${userId}`, { headers });
  }

  GetRequestsByPostId(postId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/requests/post/${postId}`, { headers });
  }

  GetRequestsByStatus(status: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/requests/status/${status}`, { headers });
  }

  GetPostById(requestId: any, token: any): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/requests/${requestId}/post`, { headers });;
  }

  AddRequest(userId: any, postId: any, request: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiurl}/requests/${userId}/${postId}`, request, { headers });
  }

  UpdateRequest(requestId: any, request: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiurl}/requests/${requestId}`, request, { headers });
  }

  DeleteRequest(requestId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/requests/${requestId}`, { headers });
  }

  // Rentals apis

  GetAllRentals(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/rentals`);
  }

  GetRentalById(rentalId: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/rentals/${rentalId}`);
  }

  GetRentalsByRequestId(requestId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/rentals/request/${requestId}`, { headers });
  }

  AddRental(requestId: any, rental: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiurl}/rentals/${requestId}`, rental, { headers });
  }

  UpdateRental(rentalId: any, rental: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiurl}/rentals/${rentalId}`, rental, { headers });
  }

  DeleteRental(rentalId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/rentals/${rentalId}`, { headers });
  }
  
  



}
