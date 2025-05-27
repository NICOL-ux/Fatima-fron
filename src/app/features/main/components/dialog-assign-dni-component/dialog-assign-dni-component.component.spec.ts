import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAssignDniComponentComponent } from './dialog-assign-dni-component.component';

describe('DialogAssignDniComponentComponent', () => {
  let component: DialogAssignDniComponentComponent;
  let fixture: ComponentFixture<DialogAssignDniComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAssignDniComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAssignDniComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
