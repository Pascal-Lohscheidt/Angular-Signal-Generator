import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurveSelectionViewComponent } from './curve-selection-view.component';

describe('CurveSelectionViewComponent', () => {
  let component: CurveSelectionViewComponent;
  let fixture: ComponentFixture<CurveSelectionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurveSelectionViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurveSelectionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
