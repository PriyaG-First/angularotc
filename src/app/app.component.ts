import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showDashbord!:boolean;
  public showlogin:boolean=true;
 // constructor(private bnIdle:BnNgIdleService){}
  // ngOnInit(){
  //   this.bnIdle.startWatching(180).subscribe((res)=>console.log("session time out",res));
  // }
  onLoginProcess(event:boolean){
    console.log("event ",event)
    if(event){
      this.showDashbord = event;
      this.showlogin = false;
    }
  }
}
