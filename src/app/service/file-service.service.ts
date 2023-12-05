import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor() { }
  private showFileInputSource = new BehaviorSubject<boolean>(true);
  showFileInput$ = this.showFileInputSource.asObservable();

  setShowFileInput(show: boolean) {
    this.showFileInputSource.next(show);
  }
}
