import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Event } from '../model/event';
import { Observable, catchError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UpdateEventService {

  constructor(private http:HttpClient,private authService:AuthService,private cookie:CookieService) { }
  getEventById(eventId:number){
    console.log(this.cookie.get("jwtToken"))
    const headers = new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("jwtToken"))
   // const headers = new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
    return this.http.get<Event>("http://localhost:9002/getEventById?eventId="+eventId,{headers});
  }
  updateEvent(event:Event){
    console.log("inside updatevent service")

    const headers = new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("jwtToken"))
   // const headers = new HttpHeaders().set("Authorization","Bearer "+this.authService.getToken())
    return this.http.post("http://localhost:9002/updateEvent",event,{headers});
  }
 
}
