import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdleService {
   idleTimeout!:any;
  constructor() { }
  restIdleTime(){
    console.log("call restIdleTime")
    clearTimeout(this.idleTimeout);
     this.idleTimeout = setTimeout(() => {
      alert("user time out "+this.idleTimeout+'s');
     }, 120000);
  }
  
}
