import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveEventsComponent } from './addevents.component';

describe('SaveEventsComponent', () => {
  let component: SaveEventsComponent;
  let fixture: ComponentFixture<SaveEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaveEventsComponent]
    });
    fixture = TestBed.createComponent(SaveEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
