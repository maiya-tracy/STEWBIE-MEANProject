import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatetrippageComponent } from './ratetrippage.component';

describe('RatetrippageComponent', () => {
  let component: RatetrippageComponent;
  let fixture: ComponentFixture<RatetrippageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatetrippageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatetrippageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
