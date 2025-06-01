import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildTabComponent } from './child-tab.component';

describe('ChildTabComponent', () => {
  let component: ChildTabComponent;
  let fixture: ComponentFixture<ChildTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
