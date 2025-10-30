import { housesService } from "../services/HousesService.js";
import BaseController from "../utils/BaseController.js";

export class HouseController extends BaseController {
  constructor() {
    super('api/houses')
    this.router
      .get('', this.getAllHouses)
      .get('/search', this.getHousesByQuery)
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

  /**
 * @param {import("express").Request} request,
 * @param {import("express").Response} response,
 * @param {import("express").NextFunction} next,
 */

  async getHousesByQuery(request, response, next) {
    try {
      const houseQuery = request.query
      // console.log(houseQuery)
      const houses = await housesService.getHousesByQuery(houseQuery)
      response.send(houses)
    } catch (error) {
      next(error)
    }
  }

  /**
  * @param {import("express").Request} request,
  * @param {import("express").Response} response,
  * @param {import("express").NextFunction} next,
  */

  async createHouse(request, response, next) {
    try {
      const houseData = request.body

    } catch (error) {
      next(error)
    }
  }



}