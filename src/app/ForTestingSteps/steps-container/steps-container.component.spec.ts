import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsContainerComponent } from './steps-container.component';

describe('StepsContainerComponent', () => {
  let component: StepsContainerComponent;
  let fixture: ComponentFixture<StepsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepsContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
