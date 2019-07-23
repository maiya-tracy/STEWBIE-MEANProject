import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspirationpageComponent } from './inspirationpage.component';

describe('InspirationpageComponent', () => {
  let component: InspirationpageComponent;
  let fixture: ComponentFixture<InspirationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspirationpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspirationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
