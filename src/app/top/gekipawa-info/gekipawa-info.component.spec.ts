import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GekipawaInfoComponent } from './gekipawa-info.component';

describe('GekipawaInfoComponent', () => {
  let component: GekipawaInfoComponent;
  let fixture: ComponentFixture<GekipawaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GekipawaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GekipawaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
