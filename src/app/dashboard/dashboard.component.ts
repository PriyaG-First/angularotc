import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { BodyStylingService } from '../service/body-styling.service';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { GetAllEventsService } from '../service/get-all-events.service';
import { AuthService } from '../service/auth.service';
import { PageableModel } from '../pageable-model';
import { Event, Event as MycoustomEvent} from '../event';
import { EventFilterService } from '../service/event-filter.service';
import { DeleteEventService } from '../service/delete-event.service';

import { DeletemodalService } from '../shared/deletemodal.service';

import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { UpdateEventService } from '../service/update-event.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public pageableModel = new PageableModel([], 0, 0);
  events: MycoustomEvent[] = [];
   event:string = "new event";
  public eventObj!: MycoustomEvent;
  public page!: number;
  currentPage!: number;
  selectedValue: number = 5;
  selectedField:string = 'id';
  isClicked:boolean = false;
  public pageObj = { "size": this.selectedValue, "page": 1 };
 public fieldName!:string;
  @Output() emitShoweventForm = new EventEmitter<boolean>();
  public showEventForm: boolean = false;
  public serachValue: any;
  constructor(private bodystyle: BodyStylingService, private router: Router, private location: Location, private getEventsService: GetAllEventsService,
    private authService: AuthService, private render: Renderer2, private filterService: EventFilterService
    ,private deleteService:DeleteEventService,private deleteModalService:DeletemodalService,private getByIdService:UpdateEventService) { }
  ngOnInit() {
    
    console.log("cookei",document.cookie)
    this.bodystyle.removeStyleFromBody("background-color")
    document.body.style.backgroundImage = 'url(https://img.freepik.com/free-photo/elegant-white-background-with-blue-wave-lines_1017-32741.jpg?w=996&t=st=1689841307~exp=1689841907~hmac=5af6708dc64c10d6d471823b0a7cf6a20ea30137f1e0426f31dd5f8d46791c5b)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.fontSize = '15px';
    this.showEvents();
    //it creates observable events return obersvable object it emits the events based on navigation in angular app.
    //this events emitted as instances of classes are NavigationStart,NavigationEnd,NavigationCancel,NavigationError.
    this.router.events
      .pipe(filter((event): event is NavigationStart => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        if (event.navigationTrigger === 'popstate' && event.url === '/login') {
          //popstate indicating the browser back and forward button click
          this.location.forward();
        }
      });
  }
  showEvents() {
     console.log("inside show events")
    this.getEventsService.getAllEvents(this.pageObj, this.authService.getToken()).subscribe({
      next: response => {
        this.pageableModel = response;
        this.events = this.pageableModel.content
        this.renderPagination(this.pageableModel.totalElements)
      }
    });
  }
  addEvent() {
    //this.fileService.setShowFileInput(true)
    this.router.navigate(['createEvent']);
  }
  updateEventForm(eventID: number) {
    //this.fileService.setShowFileInput(false)
    this.router.navigate(['updateEvent', eventID]);
  }
  getSelectedValue() {
    this.pageObj['size'] = this.selectedValue
    this.pageObj['page'] = this.currentPage;
    this.showEvents()
  }
  renderPagination(total_elements: number) {

    let total_pages = Math.ceil(total_elements / this.pageObj["size"]);
    const paginationContainer = document.getElementById('paginationContainer');
    if (paginationContainer) {
      paginationContainer.innerHTML = ''; // Clear previous pagination
    }
      for (let i = 1; i <= total_pages; i++) {
        const pageLink = this.render.createElement('a');
        this.render.setAttribute(pageLink, "href", "#");
        this.render.addClass(pageLink, 'page-link');
        pageLink.textContent = i.toLocaleString();
        //arrow function capture the this from surrounding scope here it capture from renderPagination method.
        pageLink.addEventListener('click', (event: MouseEvent) => {
          event.preventDefault()
          this.currentPage = pageLink.textContent;
           if (i == this.currentPage) {
             this.pageObj["page"] = this.currentPage;
           }
          this.showEvents()
          
        });
        paginationContainer?.appendChild(pageLink);
    }
    
  }
  clearText(){
    //const inputElement = event.target as HTMLElement;
   if(this.serachValue ===''){
    this.showEvents()
   }
  }
  filterFunction() {
    this.fieldName = this.selectedField;
     if(!this.isClicked){
      this.pageObj["page"] = 1;
     }
    if (this.serachValue != " ") {
      this.filterService.filterEvents(this.serachValue, this.fieldName, this.pageObj, this.authService.getToken())
      .subscribe({
        next:(response)=>{
          this.pageableModel= response;
      	  if(response.content==null){
      			 alert("No data found");
      		 }
      		 else{
            this.events = this.pageableModel.content;
      			 this.renderPaginationFilter(response.totalElements);
      		 }
        }
      });
    }
  }
  renderPaginationFilter(total_elements: number) {
    let total_pages = Math.ceil(total_elements / this.pageObj["size"]);
    const paginationContainer = document.getElementById('paginationContainer');
    if (paginationContainer) {
      paginationContainer.innerHTML = ''; // Clear previous pagination
    }
    if(total_pages == 1){
      console.log("inside if")
    }
    else{
    for (let i = 1; i <= total_pages; i++) {
      const pageLink = this.render.createElement('a');
      this.render.setAttribute(pageLink, "href", "#");
      this.render.addClass(pageLink, 'page-link');
      pageLink.textContent = i.toLocaleString();
      //arrow function capture the this from surrounding scope here it capture from renderPagination method.
      pageLink.addEventListener('click', (event: MouseEvent) => {
        event.preventDefault()
        this.isClicked = true;
        this.currentPage = pageLink.textContent;
         if (i == this.currentPage) {
           this.pageObj["page"] = this.currentPage;
         }
        this.filterFunction()
      });
      paginationContainer?.appendChild(pageLink);
    }
  }
  }
  getSearchValue(){
    this.fieldName= this.selectedField;
    this.showEvents()
  }
  deleteEvent(eventId:number){
    this.deleteModalService.openDeleteConfirmationModal(DeleteModalComponent).result.then(
      (result) => {
        console.log("result ",result)
        this.deleteService.deleteEvent(eventId,this.authService.getToken()).subscribe(()=>{
              console.log("delete successfully")
              this.showEvents()
      })
      },
      (reason) => {
        console.log("reason ",reason)
      }
    );
    
  }
  logout(){
    this.router.navigate(["login"])
  }
}


