import { TestBed } from '@angular/core/testing';

import { ListeProduitsService } from './liste-produits.service';

describe('ListeProduitsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ListeProduitsService = TestBed.get(ListeProduitsService);
    expect(service).toBeTruthy();
  });
});
