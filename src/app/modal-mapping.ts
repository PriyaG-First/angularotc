import { Type } from "@angular/core";
import { DeleteModalComponent } from "./delete-modal/delete-modal.component";

export const MODALS: { [name: string]: Type<any> } = {
    deleteModal: DeleteModalComponent,
  };