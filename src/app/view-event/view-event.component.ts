import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UpdateEventService } from '../service/update-event.service';
import { Event } from '../model/event';

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
    document.body.style.backgroundImage = 'url(https://img.freepik.com/free-photo/elegant-white-background-with-blue-wave-lines_1017-32741.jpg?w=996&t=st=1689841307~exp=1689841907~hmac=5af6708dc64c10d6d471823b0a7cf6a20ea30137f1e0426f31dd5f8d46791c5b)';
   this.eventId = this.activeRouter.snapshot.paramMap.get("eventId")
   this.getEventById.getEventById(this.eventId).subscribe(response=>this.event = response)
  }
}
