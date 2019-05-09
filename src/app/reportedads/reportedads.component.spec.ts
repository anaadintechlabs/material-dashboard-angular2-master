import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedadsComponent } from './reportedads.component';

describe('ReportedadsComponent', () => {
  let component: ReportedadsComponent;
  let fixture: ComponentFixture<ReportedadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportedadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportedadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
