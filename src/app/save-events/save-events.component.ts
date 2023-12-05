import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { SaveEventsService } from '../service/save-events.service';
import { Event } from '../event';
import { Router } from '@angular/router';
import { UpdateEventService } from '../service/update-event.service';
import { FileServiceService } from '../service/file-service.service';

@Component({
  selector: 'app-save-events',
  templateUrl: './save-events.component.html',
  styleUrls: ['./save-events.component.css']
})
export class SaveEventsComponent {
  public eventForm!: FormGroup;
  public trainers!: string[];
  public locations!: string[];
  public selectedFile!: FileList;
  public currentURL!: string;
  public eventId!: number;
  public eventObj!: Event;
  public showFileInput!:boolean;
  @Input() public eventFromParent!: Event;
 
  @Input() public showEventComponent: boolean = false;
  constructor(private formBuilder: FormBuilder, private eventService: SaveEventsService, private router: Router, private updateEventService: UpdateEventService,private fileService:FileServiceService) { }
  ngOnInit() {
this.fileService.showFileInput$.subscribe(show=>this.showFileInput = show);
    this.eventService.getTrainers()//this method return observable object so we need to subscribe it.
      .subscribe({
        next: (response: string[]) => {
          this.trainers = response;
        },
        error: (error) => console.error("Error!", error)
      });
    this.eventService.getLocation().subscribe({
      next: (response: string[]) => {
        this.locations = response;
      },
      error: (error) => console.error("Error!", error)
    });

    if (this.router.url.includes("/updateEvent")) {
      let button = document.getElementById("btn");
     let head = document.getElementById("head")
     if(head){
      head.innerText = 'Update Event'
     }
      if(button){
        button.innerText = 'update';
      }
      this.currentURL = this.router.url;
      this.eventId = parseInt(this.currentURL.substring(13, this.currentURL.length));
      this.initializeEventForm()
      this.updateEventForm(this.eventId);
    }
    else {
      this.initializeEventForm();
    }

  }
  get eventname() {
    return this.eventForm.get('eventname');
  }
  get startdate() {
    return this.eventForm.get('startdate');
  } get duration() {
    return this.eventForm.get('duration');
  }
  get domain() {
    return this.eventForm.get('domain');
  }
  get status() {
    return this.eventForm.get('status');
  }
  get location() {
    return this.eventForm.get('location');
  }
  get multifilename() {
    return this.eventForm.get('multifilename');
  }
  onSelectedFile(event: any) {
    this.selectedFile = event.target.files;
  }
  saveEvents() {
    console.log("inside the save events")
    if (this.router.url.includes("/updateEvent")){
      this.updateEvent()
    }

    else{
      const file: File | null = this.selectedFile.item(0);
      this.eventService.saveEvent(this.eventForm.value, file)
        .subscribe({
          next: () => {
            alert("event add successfully!")
            this.router.navigate(['dashboard']);
          }
        })
    }
   
  }
  updateEventForm(eventID: number) {
    
    this.updateEventService.getEventById(eventID).subscribe({
      next: (response) => {
        this.eventObj = response;
        this.eventForm = this.formBuilder.group({
          eventname: [this.eventObj.eventname],
          details: [this.eventObj.details],
          startdate: [this.eventObj.startdate],
          duration: [this.eventObj.duration],
          trainer: [this.eventObj.trainer],
          domain: [this.eventObj.domain],
          status: [this.eventObj.status],
          location: [this.eventObj.location],
          //multifilename: ['']
        });
      }
    });
  }
  initializeEventForm() {
    if (this.router.url.includes("/updateEvent")){
      this.eventForm = this.formBuilder.group({
        eventname: [''],
        details: [''],
        startdate: [''],
        duration: [''],
        trainer: [''],
        domain: [''],
        status: [''],
        location: [''],
        multifilename: ['']
      });
    }
    else{
      this.eventForm = this.formBuilder.group({
        eventname: ['', [Validators.required]],
        details: [''],
        startdate: ['', [Validators.required]],
        duration: ['', [Validators.required, Validators.pattern('[0-9]+')]],
        trainer: [''],
        domain: ['', [Validators.required]],
        status: ['', [Validators.required]],
        location: ['', [Validators.required]],
        multifilename: ['', [Validators.required]]
      });
    }
    
  }
  updateEvent(){
    this.eventForm.addControl("id",this.formBuilder.control(this.eventObj.id))
    this.updateEventService.updateEvent(this.eventForm.value).subscribe(()=>{
      this.router.navigate(['dashboard'])
    });
  }
}
