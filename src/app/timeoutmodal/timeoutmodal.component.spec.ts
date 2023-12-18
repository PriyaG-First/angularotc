import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeoutmodalComponent } from './timeoutmodal.component';

describe('TimeoutmodalComponent', () => {
  let component: TimeoutmodalComponent;
  let fixture: ComponentFixture<TimeoutmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeoutmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeoutmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
