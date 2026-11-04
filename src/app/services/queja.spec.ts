import { TestBed } from '@angular/core/testing';
import { Queja } from './queja';

describe('Queja', () => {
  let service: Queja;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Queja);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
