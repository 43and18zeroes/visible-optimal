import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ftse } from './ftse';

describe('Ftse', () => {
  let component: Ftse;
  let fixture: ComponentFixture<Ftse>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ftse]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ftse);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
