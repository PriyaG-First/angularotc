import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecontentmodalComponent } from './filecontentmodal.component';

describe('FilecontentmodalComponent', () => {
  let component: FilecontentmodalComponent;
  let fixture: ComponentFixture<FilecontentmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilecontentmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilecontentmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
