import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DeletemodalService {

  constructor(private modalService: NgbModal) { }
  openDeleteConfirmationModal(component:any) {
    return this.modalService.open(component, {
    
      //ariaLabelledBy: 'modal-basic-title',
    });
  }
}
