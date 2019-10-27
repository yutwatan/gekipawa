import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentGameComponent } from './recent-game.component';

describe('RecentGameComponent', () => {
  let component: RecentGameComponent;
  let fixture: ComponentFixture<RecentGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
