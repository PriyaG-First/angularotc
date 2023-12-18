import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, SimpleChanges, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { BodyStylingService } from '../service/body-styling.service';
import { NavigationStart, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { GetAllEventsService } from '../service/get-all-events.service';
import { AuthService } from '../service/auth.service';
import { PageableModel } from '../model/pageable-model';
import { Event, Event as MycoustomEvent } from '../model/event';
import { EventFilterService } from '../service/event-filter.service';
import { DeleteEventService } from '../service/delete-event.service';

import { ModalService } from '../service/modal.service';

import { FileServiceService } from '../service/file-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { UserIdleService } from 'angular-user-idle';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDirective } from 'ngx-bootstrap/modal'
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public pageableModel = new PageableModel([], 0, 0);
  events: MycoustomEvent[] = [];
  event: string = "new event";
  public eventObj!: MycoustomEvent;
  public page!: number;
  currentPage!: number;
  selectedValue: number = 5;
  selectedField: string = 'id';
  isClicked: boolean = false;
  public idlestate!: any;
  public pageObj = { "size": this.selectedValue, "page": 1 };
  public fieldName!: string;
  @Output() emitShoweventForm = new EventEmitter<boolean>();
  public showEventForm: boolean = false;
  public serachValue: any;
  public isOpen:boolean = false;
  @ViewChild('childModal',{ static: false }) childModal!: ModalDirective;

  constructor(private bodystyle: BodyStylingService, private router: Router, private location: Location, private getEventsService: GetAllEventsService,
    private authService: AuthService, private render: Renderer2, private filterService: EventFilterService
    , private deleteService: DeleteEventService, private modalService: ModalService, private fileService: FileServiceService, private sanitizer: DomSanitizer,
    private userIdleService: UserIdleService, public modal: NgbActiveModal, private bsmodal: BsModalService) {
     this.userIdleService.startWatching()
     console.log("start watching...")
    this.userIdleService.onTimerStart().subscribe((count) => {
      this.idlestate = "you will be time out in " + count + " sec"
     // this.isOpen = true;
     // this.childModal.show()
      const bsmodalBackdrop = document.getElementsByTagName("bs-modal-backdrop");
      console.log("bsmodalBackdrop ", bsmodalBackdrop)
    })
     this.userIdleService.onTimeout().subscribe(() => {
      alert("going to timeout")
       this.userIdleService.stopTimer()
       this.logout()
     })

   }
  // ngAfterViewInit() {
  //   console.log('childModal:', this.childModal);
  // }
  ngOnInit() {

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
    this.getEventsService.getAllEvents(this.pageObj, this.authService.getToken()).subscribe({
      next: response => {
        this.pageableModel = response;
        this.events = this.pageableModel.content
        this.renderPagination(this.pageableModel.totalElements)
      }
    });
  }
  addEvent() {
    this.router.navigate(['createEvent']);
  }
  updateEventForm(eventID: number) {
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
  clearText() {
    //const inputElement = event.target as HTMLElement;
    if (this.serachValue === '') {
      this.showEvents()
    }
  }
  filterFunction() {
    this.fieldName = this.selectedField;
    if (!this.isClicked) {
      this.pageObj["page"] = 1;
    }
    if (this.serachValue != " ") {
      this.filterService.filterEvents(this.serachValue, this.fieldName, this.pageObj, this.authService.getToken())
        .subscribe({
          next: (response) => {
            this.pageableModel = response;
            if (response.content == null) {
              alert("No data found");
            }
            else {
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
    if (total_pages == 1) {

    }
    else {
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
  getSearchValue() {
    this.fieldName = this.selectedField;
    this.showEvents()
  }
  deleteEvent(eventId: number) {
    this.modalService.openDeleteConfirmationModal().result.then(
      () => {
        this.deleteService.deleteEvent(eventId, this.authService.getToken()).subscribe(() => {
          this.showEvents()
        })
      }
    );

  }

  viewcontent(id: number) {
    this.fileService.getFilecontent(id).subscribe((response: Blob) => {
      const url = URL.createObjectURL(response);
      //we have to sanitize our url ny DOMSanitizer
      const trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.modalService.openFileContentModal(trustedURL);
    })
  }
  logout() {
     this.userIdleService.stopWatching()
    // this.childModal.hide()
  
    // // this.bsmodal.hide()
    // const bsmodalBackdrop = document.querySelector('bs-modal-backdrop');
    // bsmodalBackdrop?.remove()
    // const modalBackdrop = document.querySelector('.modal-backdrop');
    //   if (modalBackdrop) {
    //     modalBackdrop.classList.remove('show');
    //     modalBackdrop.classList.remove('fade');
    //   }
    this.bodystyle.addStyleFromBody()
    localStorage.clear()
    this.authService.setToken("");
    //it navigate to login and also replace the current url with navigate history so user try to go back it again navigate to the login url. 
    this.router.navigate(["login"], { replaceUrl: true })
  }
  // stay() {
  //   // this.bsmodal.hide()
  //   const bsmodalBackdrop = document.querySelector('bs-modal-backdrop');
  //   bsmodalBackdrop?.remove()
  //   this.childModal.hide()


  //   this.userIdleService.resetTimer()
  // }
  // hideChildModal() {
  //   this.childModal.hide()
  // }
}


