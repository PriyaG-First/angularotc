import { Component } from '@angular/core';
import { BodyStylingService } from './service/body-styling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public showDashbord!:boolean;
  public showlogin:boolean=true;
  constructor(private bodyStyle:BodyStylingService){}
   ngOnInit(){
     this.bodyStyle.addStyleFromBody()
   }
  onLoginProcess(event:boolean){
    console.log("event ",event)
    if(event){
      this.showDashbord = event;
      this.showlogin = false;
    }
  }
}
