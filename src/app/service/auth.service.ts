import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtToken!:string;
  constructor() { }

  setToken(token:string):void{
    this.jwtToken = token;
  }
  
  getToken():string{
    return this.jwtToken;
  }
  checkToken():boolean{
    return this.getToken()==null;
  }
  
}
