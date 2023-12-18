import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Injector, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

  if(inject(AuthService).getToken()!=null || localStorage.getItem("jwtToken")!=null){
    return true;
  }
  else{
    inject(Router).navigate(['login'])
    return false;
  }
 
};
