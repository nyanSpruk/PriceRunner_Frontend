import { TestBed } from '@angular/core/testing';

import { ProductStorePriceService } from './product-store-price.service';

describe('ProductStorePriceService', () => {
  let service: ProductStorePriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductStorePriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
