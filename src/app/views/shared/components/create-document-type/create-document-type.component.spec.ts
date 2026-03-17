import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentTypeComponent } from './create-document-type.component';

describe('CreateDocumentTypeComponent', () => {
  let component: CreateDocumentTypeComponent;
  let fixture: ComponentFixture<CreateDocumentTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocumentTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
