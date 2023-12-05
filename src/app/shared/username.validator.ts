import { AbstractControl } from '@angular/forms'
export function validateUsername(control:AbstractControl):Promise<{[key:string]:any} | null>{
    //it return the null if the condition fails otherwise it return object key is string type value ia any type.
    return new Promise(function (myfunction){
        const forbiddenName = ['admin','username','password'];
    if(forbiddenName.includes(control.value?.toLowerCase())){
        myfunction({'forbiddenName':{value:control.value}});
    }
    else{
        myfunction(null) ;
    }
    });
}