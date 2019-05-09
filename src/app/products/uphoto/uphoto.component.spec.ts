import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UphotoComponent } from './uphoto.component';

describe('UphotoComponent', () => {
  let component: UphotoComponent;
  let fixture: ComponentFixture<UphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
