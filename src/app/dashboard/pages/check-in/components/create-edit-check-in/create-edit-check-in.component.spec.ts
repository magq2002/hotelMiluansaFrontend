import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditCheckInComponent } from './create-edit-check-in.component';

describe('CreateEditCheckInComponent', () => {
  let component: CreateEditCheckInComponent;
  let fixture: ComponentFixture<CreateEditCheckInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditCheckInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
