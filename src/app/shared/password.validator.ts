import { AbstractControl } from '@angular/forms'
export function PasswordValidator(control:AbstractControl):Promise<{[key:string]:boolean} | null> {
   
   const password = control.get('password');
   const confirmPassword = control.get('confirmPassword');
   return new Promise(function (resolve){
    if(password?.pristine || confirmPassword?.pristine){
        console.log("inside the validation another if ");
        resolve(null) ;
    }
        else if(password && confirmPassword && password.value!== confirmPassword.value){
            console.log("inside the validation if ");
            confirmPassword.setErrors({'misMatch':true});
            resolve({'misMatch':true});
        }
        else{
            resolve(null);
        }
   });
  
}