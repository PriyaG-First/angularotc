import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { UserIdleService } from '../user-idle.service';
import { JwtResponseModel } from '../jwt-response-model';
import { AuthService } from '../service/auth.service';
import { validateUsername } from '../shared/username.validator';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent {
   public loginForm!:FormGroup;
   public hasError!:boolean;
   public isAuthenticated:boolean = false;
    public jwtResponseModel!:JwtResponseModel;
   @Output() emitAuthentication =new EventEmitter();
   constructor(private formBuilder:FormBuilder,private loginService:LoginService,private router:Router,private idleservice:UserIdleService
    ,private authService:AuthService){
      
    }
   ngOnInit(){
     this.loginForm =  this.formBuilder.group({
       username : ['',[Validators.required,Validators.minLength(3)],validateUsername],
       password : ['',[Validators.required]]
     });
   }
 
   get username(){
     return this.loginForm.get('username');
   }
   get password(){
     return this.loginForm.get('password');
   }
   onSubmit(){
     this.loginService.login(this.loginForm.value).subscribe(
                   response=>{
                     this.jwtResponseModel = response;
                     this.isAuthenticated = this.jwtResponseModel.authenticated;
                     if(this.isAuthenticated){
                     // this.authService.setToken(response);
                        this.authService.setToken(this.jwtResponseModel.token);
                       // sessionStorage.setItem("JOTToken",this.authService.getToken())
                        this.toDashboard();
                       this.emitAuthentication.emit(this.isAuthenticated);
                        
                     }
                  },
                   (error)=>{
                                     let url:String = error.url;
                                     if(url.includes('error')){
                                       this.hasError = true;
                                     }
                                  }
      );
   }
 private toDashboard(){
  this.router.navigate(['/dashboard']);
  //this.idleservice.restIdleTime();
  // document.addEventListener('mousemove',this.idleservice.restIdleTime);
  // document.addEventListener('keydown',this.idleservice.restIdleTime)
 }
}
