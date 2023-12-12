import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppCookieService {

  constructor() { }
  set(key:string,value:string){
   // document.cookie = key+"="+value;
document.cookie="user=priya;httpOnly"
    
  }
  get(key:string){

  }
}
