import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParentComponent } from './new-parent.component';

describe('NewParentComponent', () => {
  let component: NewParentComponent;
  let fixture: ComponentFixture<NewParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
