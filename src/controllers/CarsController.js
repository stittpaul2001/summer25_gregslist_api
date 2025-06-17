import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super('api/cars') // mount path (big door)
    this.router
      .get('', this.getAllCars)
      .get('/search', this.getCarsByQuery)
      .post('', this.createCar)
  }

  /**
* @param {import("express").Request} request,
* @param {import("express").Response} response,
* @param {import("express").NextFunction} next,
*/
  async getAllCars(request, response, next) {
    try {
      const cars = await carsService.getAllCars()
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request,
  * @param {import("express").Response} response,
  * @param {import("express").NextFunction} next,
  */
  async getCarsByQuery(request, response, next) {
    try {
      // NOTE ?make=mazda --> { make: 'mazda' }
      const carQuery = request.query
      const cars = await carsService.getCarsByQuery(carQuery)
      response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request,
  * @param {import("express").Response} response,
  * @param {import("express").NextFunction} next,
  */
  async createCar(request, response, next) {
    try {
      const carData = request.body
      const car = await carsService.createCar(carData)
      response.send(car)
    } catch (error) {
      next(error)
    }
  }
}