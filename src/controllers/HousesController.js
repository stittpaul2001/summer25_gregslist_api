import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HousesController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAllHouses)
  }

  /**
 * @param {import("express").Request} request,
 * @param {import("express").Response} response,
 * @param {import("express").NextFunction} next,
 */

  async getAllHouses(request, response, next) {
    try {
      const houses = await housesService.getAllHouses()
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }



}