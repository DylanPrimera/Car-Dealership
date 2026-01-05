import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v7 as uuid } from 'uuid';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [];

  findAll() {
    return this.cars;
  }

  findOne(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const carNew = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(carNew);
    return carNew;
  }
  update(id: string, updateCarDto: UpdateCarDto) {
    let carDB = this.findOne(id);
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car with ID: ${id}, is not valid`);

    this.cars = this.cars.map((car) => {
      if (car.id === id) {
        carDB = {
          ...carDB,
          ...updateCarDto,
        };
        return carDB;
      }
      return car;
    });
    return carDB;
  }
  delete(id: string) {
    const carDB = this.findOne(id);
    this.cars = this.cars.filter((car) => car.id !== carDB.id);
  }

  fillCarsWithSeedData(cars: Car[]) {
    this.cars = cars;
    return this.cars;
  }
}
