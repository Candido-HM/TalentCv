import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormacionFormComponent } from './formacion-form.component';

describe('FormacionFormComponent', () => {
  let component: FormacionFormComponent;
  let fixture: ComponentFixture<FormacionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormacionFormComponent]
    });
    fixture = TestBed.createComponent(FormacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
