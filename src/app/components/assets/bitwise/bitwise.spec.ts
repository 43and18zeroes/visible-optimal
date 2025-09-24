import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bitwise } from './bitwise';

describe('Bitwise', () => {
  let component: Bitwise;
  let fixture: ComponentFixture<Bitwise>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bitwise]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bitwise);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
