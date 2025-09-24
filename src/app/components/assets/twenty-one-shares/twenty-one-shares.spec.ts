import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwentyOneShares } from './twenty-one-shares';

describe('TwentyOneShares', () => {
  let component: TwentyOneShares;
  let fixture: ComponentFixture<TwentyOneShares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwentyOneShares]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwentyOneShares);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
