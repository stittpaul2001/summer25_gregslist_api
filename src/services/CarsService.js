import { dbContext } from "../db/DbContext.js"

class CarsService {
  async getAllCars() {
    const cars = await dbContext.Cars.find()
    return cars
  }

  async getCarsByQuery(carQuery) {
    // const cars = await dbContext.Cars.find({ make: 'Mazda', model: 'Miata' })
    // const cars = await dbContext.Cars.find(carQuery).populate('creator', '-subs -email')
    // const cars = await dbContext.Cars.find(carQuery).populate('creator', ['name', 'picture'])
    const cars = await dbContext.Cars.find(carQuery).populate('creator', 'name picture')
    return cars
  }
}

export const carsService = new CarsService()