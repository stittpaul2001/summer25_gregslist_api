import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor() {
    super('api/cars') // mount path (big door)
    this.router
      .get('', this.getAllCars)
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
}