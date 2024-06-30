import { TestBed } from '@angular/core/testing';

import { CarsouselService } from './carsousel.service';

describe('CarsouselService', () => {
  let service: CarsouselService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsouselService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
