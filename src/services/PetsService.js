import { dbContext } from "../db/DbContext.js"


class PetsService {
  async getAllPets(petQuery) {
    const sortBy = petQuery.sort || 'createdAt'
    delete petQuery.sort
    if (sortBy) petQuery.species = { $regex: new RegExp(sortBy, 'ig') }
    const pageNumber = parseInt(petQuery.page) || 1
    delete petQuery.page
    const petLimit = 10
    const skipAmount = (pageNumber - 1) * petLimit

    const pets = await dbContext.Pets
      .find(petQuery)
      .sort(sortBy)
      .skip(skipAmount)
      .limit(petLimit)
      .populate('creator', 'name picture')

    return pets
  }

}

export const petsService = new PetsService()