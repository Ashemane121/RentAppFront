import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap,map,catchError } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  apiurl='http://localhost:8080/RentCars/api/auth'

  //refreshing component
  private refreshComponent = new Subject<void>();
  get refreshComponent$() {
    return this.refreshComponent.asObservable();
  }
  refresh() {
    this.refreshComponent.next();
  }



  RegisterUser(inputdata:any){
    return this.http.post(this.apiurl+'/register',inputdata)
  }
  Login(inputdata: any) {
    return this.http.post(`${this.apiurl}/authenticate`, inputdata);
  }
  RegisterAdmin(inputdata:any){
    return this.http.post(this.apiurl+'/admin/register',inputdata)
  }
  LoginAdmin(inputdata: any) {
    return this.http.post(`${this.apiurl}/admin/authenticate`, inputdata);
  }
  Logout(token: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiurl}/logout`, {}, { headers });
  }

  Update(inputdata: any, token: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiurl}/update`, inputdata, { headers });
  }
  UpdateEmail(inputdata: any, token: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiurl}/updateEmail`, inputdata, { headers });
  }
  UpdatePassword(inputdata: any, token: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiurl}/updatePassword`, inputdata, { headers });
  }

  GetUserByEmail(email: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiurl}/user?email=${email}`, { headers });
}
  GetUsers(adminEmail: any, token: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiurl}/users?email=${adminEmail}`, { headers });
  }
  CheckEmail(email: any) {
    return this.http.get(`${this.apiurl}/checkEmail?email=${email}`, { observe: 'response' })
      .pipe(map(response => response.status === 200));
  }
  CheckAdmin(email: any) {
    return this.http.get(`${this.apiurl}/checkAdmin?email=${email}`, { observe: 'response' })
      .pipe(map(response => response.status === 200));
  }

  IsLoggedIn(){
    return sessionStorage.getItem('token')!=null;
  }
  IsAdmin(){
    return sessionStorage.getItem('token')!=null && sessionStorage.getItem('userRole')==='ADMIN';
  }
}
