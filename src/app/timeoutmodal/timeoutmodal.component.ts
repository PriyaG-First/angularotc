import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timeoutmodal',
  standalone: true,
  imports: [],
  templateUrl: './timeoutmodal.component.html',
  styleUrl: './timeoutmodal.component.css'
})
export class TimeoutmodalComponent implements OnChanges{
@Input() idleState:any;
constructor(public modal:NgbActiveModal){}
ngOnChanges(changes: SimpleChanges): void {
  // Called whenever the input properties change

  // Check if the 'inputValue' property has changed
  if (changes[this.idleState]) {
    const newInputValue = changes[this.idleState].currentValue;
    const previousInputValue = changes[this.idleState].previousValue;

    console.log(`Previous Value: ${previousInputValue}, New Value: ${newInputValue}`);

    // Perform any logic based on the changes
  }
}
updateIdleState(state:any){
  this.idleState = state;
}
logout(){

}
stay(){

}
hideChildModal(){

}
}
