import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/posts'

  GetAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/all`);
  }

  GetPostById(postId: any): Observable<any> {
    return this.http.get<any>(`${this.apiurl}/get/${postId}`);
  }

  AddPost(userId: any, post: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(`${this.apiurl}/${userId}`, post, { headers });
  }

  UpdatePost(postId: any, post: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiurl}/${postId}`, post, { headers });
  }

  DeletePost(postId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<any>(`${this.apiurl}/${postId}`, { headers });
  }
  
  GetPostsByUserId(userId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/user/${userId}`, { headers });
  }

  GetPostsIdByUserId(userId: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.apiurl}/user/${userId}`, { headers }).pipe(
      map((posts: any[]) => posts.map(post => post.id_post))
    );
  }

  PostOwned(postId: any): Observable<boolean> {
    return this.GetPostsIdByUserId(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
      .pipe(
        map(response => {
          const myPostsId = response
          return myPostsId.includes(postId)
        })
      );
  }
}
