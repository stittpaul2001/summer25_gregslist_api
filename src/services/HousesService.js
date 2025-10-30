import { dbContext } from "../db/DbContext.js"

class HousesService {


  async getAllHouses(houseQuery) {
    const sortBy = houseQuery.sort || 'createdAt'
    delete houseQuery.sort
    const pageNumber = parseInt(houseQuery.page) || 1
    delete houseQuery.page
    const houseLimit = 10
    const skipAmount = (pageNumber - 1) * houseLimit

    const houses = await dbContext.Houses
      .find(houseQuery)
      .sort(sortBy)
      .skip(skipAmount)
      .limit(houseLimit)
      .populate('creator', 'name picture')

    // const houses = await dbContext.Houses.find({ levels: 2 }).populate
    return houses

  }

  // const pageRespond = {
  //   currentPage: pageNumber,
  //   previousPage: pageNumber - 1 || null,
  //   nextPage == pageNumber ? null : pageNumber + 1,
  // totalAmount: housesCount,
  // totalPages: totalPages,
  // houses: houses}




  // async getAllHouses() {

  //   //NOTE - can add in any specific characteristic to help search by that name and pull out only those with that characteristic trait you had searched for.

  //   const houses = await dbContext.Houses.find()


  //   return houses
  // }

}

export const housesService = new HousesService()
