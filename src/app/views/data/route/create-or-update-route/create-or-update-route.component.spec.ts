import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrUpdateRouteComponent } from './create-or-update-route.component';

describe('CreateOrUpdateRouteComponent', () => {
  let component: CreateOrUpdateRouteComponent;
  let fixture: ComponentFixture<CreateOrUpdateRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateRouteComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
