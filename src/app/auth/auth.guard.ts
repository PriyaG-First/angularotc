import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Injector, inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  // Injector.create({providers:[{provide:AuthService,useClass:AuthService}]})
  // Injector.name
  let check:boolean;
   console.log(state.url)
  // console.log(route)
  // console.log("inside the authGurd",inject(AuthService).getToken())
  // console.log("inside the authGurd",inject(AuthService).checkToken())
  //console.log(sessionStorage.getItem("JOTToken"))
  //  if(sessionStorage.getItem("JOTToken")!=null){
  //    console.log("inside the if getItem")
  // //  // check = true;
  //    return true;
  //  }
  //  else{
  //    return false;
  //  }

  if(inject(AuthService).getToken()!=null){
     console.log("inside the authGurd",inject(AuthService).getToken())
    console.log(" getToken does not null")
    inject(Router).navigate(['dashboard']);
    return false;
  }
  else{
    console.log("inside the authGurd token",inject(AuthService).getToken())
    return true;
  }
  
  //return inject(AuthService).checkToken();
 
};
