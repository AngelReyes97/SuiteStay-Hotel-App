import { TestBed } from '@angular/core/testing';

import { HideNavbarService } from './hide-navbar.service';

describe('HideNavbarService', () => {
  let service: HideNavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HideNavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
