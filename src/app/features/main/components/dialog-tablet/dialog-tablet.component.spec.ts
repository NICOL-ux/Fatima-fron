import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTabletComponent } from './dialog-tablet.component';

describe('DialogTabletComponent', () => {
  let component: DialogTabletComponent;
  let fixture: ComponentFixture<DialogTabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTabletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
