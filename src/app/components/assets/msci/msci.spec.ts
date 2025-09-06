import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Msci } from './msci';

describe('Msci', () => {
  let component: Msci;
  let fixture: ComponentFixture<Msci>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Msci]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Msci);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
