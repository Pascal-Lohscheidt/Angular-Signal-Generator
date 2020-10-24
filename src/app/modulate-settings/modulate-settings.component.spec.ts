import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModulateSettingsComponent } from './modulate-settings.component';

describe('ModulateSettingsComponent', () => {
  let component: ModulateSettingsComponent;
  let fixture: ComponentFixture<ModulateSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModulateSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModulateSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
