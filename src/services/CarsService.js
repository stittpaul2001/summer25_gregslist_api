import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CarsService {
  async getAllCars() {
    const cars = await dbContext.Cars.find()
    return cars
  }

  async getCarsByQuery(carQuery) {
    const pageNumber = parseInt(carQuery.page) || 1 // saves page value from query to this method
    delete carQuery.page // removes page key:value pair from object

    const carLimit = 10
    const skipAmount = (pageNumber - 1) * carLimit

    const carsCount = await dbContext.Cars.countDocuments(carQuery)
    const totalPages = Math.ceil(carsCount / carLimit)

    if (pageNumber > totalPages) {
      throw new BadRequest(`${pageNumber} is larger than the maximum amount of pages (${totalPages})`)
    }

    const cars = await dbContext.Cars
      .find(carQuery)
      .skip(skipAmount)
      .limit(carLimit)
      .populate('creator', 'name picture')

    const pageResponse = {
      currentPage: pageNumber,
      previousPage: pageNumber - 1 || null,
      nextPage: totalPages == pageNumber ? null : pageNumber + 1,
      totalResults: carsCount,
      totalPages: totalPages,
      cars: cars
    }

    return pageResponse
  }


  async createCar(carData) {
    const car = await dbContext.Cars.create(carData)
    return car
  }
}

export const carsService = new CarsService()