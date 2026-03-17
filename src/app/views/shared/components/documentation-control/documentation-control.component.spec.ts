import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationControlComponent } from './documentation-control.component';

describe('DocumentationControlComponent', () => {
  let component: DocumentationControlComponent;
  let fixture: ComponentFixture<DocumentationControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
