import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { Event } from '../event';

@Injectable({
  providedIn: 'root'
})
export class SaveEventsService {

  constructor(private http:HttpClient,private authService:AuthService) { }
  saveEvent(events:Event,file:File|null){
    const headers = new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
    const formData = new FormData();
    formData.append('events',JSON.stringify(events));
    formData.append('multifilename',file || "");

   return this.http.post<string>("http://localhost:9001/new/events",formData,{headers}).pipe(catchError(this.errorHandler));
  }
  getTrainers(){
    return this.http.get<string[]>("http://localhost:8081/getTrainers");
  }
  getLocation(){
    return this.http.get<string[]>("http://localhost:8081/getLocation");
  }
  private errorHandler(error:HttpErrorResponse){
    if(error.status===0){
      console.error("Maybe network error or client side error ",error.error);
    }
    else{
      console.error("Backend side error "+error.status,error.error);
    }
    return throwError(()=>new Error("Something bad happened; please try again later."));
  }
}