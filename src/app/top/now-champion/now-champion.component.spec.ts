import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NowChampionComponent } from './now-champion.component';

describe('NowChampionComponent', () => {
  let component: NowChampionComponent;
  let fixture: ComponentFixture<NowChampionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NowChampionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NowChampionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
