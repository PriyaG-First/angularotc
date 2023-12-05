import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageableModel } from '../pageable-model';


@Injectable({
  providedIn: 'root'
})
export class GetAllEventsService {

  constructor(private http:HttpClient) { }

  getAllEvents(pageObj:any,token:string){
    // console.log(pageObj['size'])
    const headers = new HttpHeaders().set("Authorization","Bearer "+token);
    return this.http.get<PageableModel>("http://localhost:9000/events/getAllEvents?size="+pageObj['size']+"&page="+pageObj['page'],{headers});
  }
}
