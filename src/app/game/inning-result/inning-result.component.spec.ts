import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InningResultComponent } from './inning-result.component';

describe('InningResultComponent', () => {
  let component: InningResultComponent;
  let fixture: ComponentFixture<InningResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InningResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InningResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
