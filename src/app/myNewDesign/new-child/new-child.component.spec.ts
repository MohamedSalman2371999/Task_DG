import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChildComponent } from './new-child.component';

describe('NewChildComponent', () => {
  let component: NewChildComponent;
  let fixture: ComponentFixture<NewChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
