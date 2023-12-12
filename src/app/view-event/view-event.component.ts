import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateEventService } from '../service/update-event.service';
import { Event } from '../event';

@Component({
  selector: 'app-view-event',
  standalone: true,
  imports: [],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent {
  public eventId!:any;
  public event!:Event
  constructor(private activeRouter:ActivatedRoute,private getEventById:UpdateEventService){}
  ngOnInit(){
   this.eventId = this.activeRouter.snapshot.paramMap.get("eventId")
   this.getEventById.getEventById(this.eventId).subscribe(response=>{console.log(response)
                                                                        this.event = response})
  }
}
