import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-filecontentmodal',
  standalone: true,
  imports: [],
  templateUrl: './filecontentmodal.component.html',
  styleUrl: './filecontentmodal.component.css'
})
export class FilecontentmodalComponent {
  @Input() data: any;
}
