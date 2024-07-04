import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicationFormComponent } from './ubication-form.component';

describe('UbicationFormComponent', () => {
  let component: UbicationFormComponent;
  let fixture: ComponentFixture<UbicationFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UbicationFormComponent]
    });
    fixture = TestBed.createComponent(UbicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
