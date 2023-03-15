import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/posts'

  GetAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/all`);
  }

  GetPostById(postId: number): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${postId}`);
  }

  AddPost(userId: number, post: any): Observable<any> {
    return this.http.post<any>(`${this.apiurl}/${userId}`, post);
  }

  UpdatePost(postId: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiurl}/${postId}`, post);
  }

  DeletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiurl}/${postId}`);
  }
  
  GetPostsByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/user/${userId}`);
  }
}
