import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateOrUpdateExpenseComponent } from './create-or-update-expense.component';

describe('CreateOrUpdateExpenseComponent', () => {
  let component: CreateOrUpdateExpenseComponent;
  let fixture: ComponentFixture<CreateOrUpdateExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrUpdateExpenseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrUpdateExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
