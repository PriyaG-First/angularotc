import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { FilecontentmodalComponent } from '../filecontentmodal/filecontentmodal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }
  openDeleteConfirmationModal() {
    return this.modalService.open(DeleteModalComponent, {
    });
  }
  openFileContentModal(url:any){
    const modalRef= this.modalService.open(FilecontentmodalComponent,{});
    modalRef.componentInstance.data = url;
  }
}
