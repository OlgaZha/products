import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserCardComponent } from './app-user-card.component';

describe('AppUserCardComponent', () => {
  let component: AppUserCardComponent;
  let fixture: ComponentFixture<AppUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
