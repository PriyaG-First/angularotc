import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableModel } from '../model/pageable-model';

@Injectable({
  providedIn: 'root'
})
export class EventFilterService {

  constructor(private http:HttpClient) { }
  filterEvents(data:any,fieldName:string,pageObj:any,token:string){
    const headers = new HttpHeaders().set("Authorization","Bearer "+token);
    return this.http.get<PageableModel>("http://localhost:9003/events/searchByColumns?data="+data+'&field='+fieldName+'&size='+pageObj["size"]+'&page='+pageObj["page"],{headers})
  }
}
