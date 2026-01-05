import { Injectable } from '@nestjs/common';
import { BRANDS_SEED, CARS_SEED } from './data';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly carsService: CarsService,
  ) {}
  populateDB() {
    this.brandsService.fillBrandsWithSeedData(BRANDS_SEED);
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    return 'Seed excecuted';
  }
}
