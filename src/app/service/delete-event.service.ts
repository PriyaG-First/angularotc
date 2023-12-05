import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteEventService {

  constructor(private http:HttpClient) { }

  deleteEvent(eventId:number,token:string){
    console.log(token)
    const headers = new HttpHeaders().set("Authorization","Bearer "+token);
    return this.http.delete("http://localhost:9004/events/deleteByEventId?eventId="+eventId,{headers});
  }
}
