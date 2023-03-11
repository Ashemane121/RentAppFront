import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';


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
  Logout(token: string) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiurl}/logout`, {}, { headers });
  }

  GetUserbyCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  Getall(){
    return this.http.get(this.apiurl);
  }
  updateuser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getuserrole(){
    return this.http.get('http://localhost:3000/role');
  }
  IsLoggedIn(){
    return sessionStorage.getItem('token')!=null;
  }
  getrole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  GetAllCustomer(){
    return this.http.get('http://localhost:3000/customer');
  }
  Getaccessbyrole(role:any,menu:any){
    return this.http.get('http://localhost:3000/roleaccess?role='+role+'&menu='+menu)
  }
}
