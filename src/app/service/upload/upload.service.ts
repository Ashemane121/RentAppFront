import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/images'

  GetImageByRef(ref: any): Observable<Blob> {
    return this.http.get(`${this.apiurl}/ref/${ref}`, { responseType: 'blob' });
  }
  
  GetImageByName(name: any): Observable<Blob> {
    return this.http.get(`${this.apiurl}/name/${name}`, { responseType: 'blob' });
  }
  

  UploadImage(image: File, ref: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('image', image);
    formData.append('ref', ref);
    return this.http.post<any>(this.apiurl, formData, { headers });
  }

  DeleteImageByRef(ref: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/ref/${ref}`, { headers });
  }

}
