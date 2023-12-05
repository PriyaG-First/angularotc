import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user';
import { catchError, throwError } from 'rxjs';
import { JwtResponseModel } from '../jwt-response-model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(userData:User){
    const headers = new HttpHeaders().set('authorization' , 'Basic ' + btoa(userData.username + ':' + userData.password))
                                    //.set('Content-Type'  , 'application/json');
                                  .set('Content-Type','application/x-www-form-urlencoded')
  //when we pass the user data as json object we need to set the content type is application/json.
  //And also in microservice there is no formLogin in securityconfiguration.
  //when we pass the user data as formData using URLSearcgParams we have to give the content type is application/x-www-form-urlencoded.
  //And also in microservice there is a formLogin in securityconfiguration.
    const formData = new URLSearchParams();
    formData.set('username', userData.username);
    formData.set('password', userData.password);
     return this.http.post<JwtResponseModel>("http://localhost:8080/login",formData.toString(),{headers});//.pipe(catchError(this.errorHandler));
    //return this.http.post<JwtResponseModel>("http://localhost:8080/login",userData,{headers})
  }
  //  private errorHandler(error:HttpErrorResponse){
  //    if(error.status===0){
  //      console.error("Maybe network error or client side error ",error.error);
  //    }
  //    else{
  //      console.error("Backend side error "+error.status,error.error);
  //    }
  //    return throwError(()=>new Error("Something bad happened; please try again later."));
  //  }
}
