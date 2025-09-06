import { TestBed } from '@angular/core/testing';

import { ComponentSwitchService } from './component-switch-service';

describe('ComponentSwitchService', () => {
  let service: ComponentSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
