import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private http:HttpClient,private cookie:CookieService) { }
  private showFileInputSource = new BehaviorSubject<boolean>(true);
  showFileInput$ = this.showFileInputSource.asObservable();

  setShowFileInput(show: boolean) {
    this.showFileInputSource.next(show);
  }
  getFilecontent(id:number){
    const headers = new HttpHeaders().set("Authorization","Bearer "+localStorage.getItem("jwtToken"));
   // const headers = new HttpHeaders().set("Authorization","Bearer "+this.cookie.get("jwtToken"))
    return this.http.get("http://localhost:9006/file/download/content?eventId="+id,{headers,responseType:"blob"},)
  }
}
