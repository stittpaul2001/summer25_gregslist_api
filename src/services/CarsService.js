import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js"
import { dbContext } from "../db/DbContext.js"

class CarsService {
  async getAllCars() {
    const cars = await dbContext.Cars.find()
    return cars
  }

  async getCarsByQuery(carQuery) {
    const pageNumber = parseInt(carQuery.page) || 1
    delete carQuery.page

    const carLimit = 10
    const skipAmount = (pageNumber - 1) * carLimit

    // const cars = await dbContext.Cars.find({ make: 'Mazda', model: 'Miata' })
    // const cars = await dbContext.Cars.find(carQuery).populate('creator', '-subs -email')
    // const cars = await dbContext.Cars.find(carQuery).populate('creator', ['name', 'picture'])

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
      // NOTE goofy code below
      nextPage: totalPages == pageNumber ? null : pageNumber + 1,
      totalResults: carsCount,
      totalPages: totalPages,
      cars: cars
    }
    return pageResponse
  }
}

export const carsService = new CarsService()