import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentItemsComponent } from './student-items.component';

describe('StudentItemsComponent', () => {
  let component: StudentItemsComponent;
  let fixture: ComponentFixture<StudentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
