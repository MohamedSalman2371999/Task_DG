import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreFormsValueComponent } from './store-forms-value.component';

describe('StoreFormsValueComponent', () => {
  let component: StoreFormsValueComponent;
  let fixture: ComponentFixture<StoreFormsValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreFormsValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreFormsValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
