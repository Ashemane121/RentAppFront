import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/ratings'

  GetAllRatings(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/all`);
  }

  GetRatingById(ratingId: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${ratingId}`);
  }

  GetRatingsByPostId(postId: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/post/${postId}`);
  }

  GetRatingByRentalId(rentalId: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/rental/${rentalId}`);
  }

  AddRating(rentalId: any, rating: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiurl}/${rentalId}`, rating, { headers });
  }

  UpdateRating(ratingId: any, rating: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiurl}/${ratingId}`, rating, { headers });
  }

  DeleteRating(ratingId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/${ratingId}`, { headers });
  }

}
