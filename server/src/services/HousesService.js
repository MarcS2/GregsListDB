import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class HousesService {
  async destroyHouse(houseId, userId) {
    const houseToBeDestroyed = await this.getHouseById(houseId)
    if (houseToBeDestroyed.creatorId.toString() != userId) {
      throw new Forbidden('Not yours to destroy')
    }
    await houseToBeDestroyed.remove()
    return houseToBeDestroyed
  }
  async updateHouse(houseId, userId, houseData) {
    const houseToBeUpdated = await this.getHouseById(houseId)
    if (houseToBeUpdated.creatorId.toString() != userId) {
      throw new Forbidden('Not your house')
    }

    houseToBeUpdated.bedrooms = houseData.bedrooms || houseToBeUpdated.bedrooms
    houseToBeUpdated.bathrooms = houseData.bathrooms || houseToBeUpdated.bathrooms
    houseToBeUpdated.year = houseData.year || houseToBeUpdated.year
    houseToBeUpdated.price = houseData.price || houseToBeUpdated.price
    houseToBeUpdated.imgUrl = houseData.imgUrl || houseToBeUpdated.imgUrl
    await houseToBeUpdated.save()
    return houseToBeUpdated
  }
  async createHouse(houseData) {
    const house = await dbContext.House.create(houseData)
    return house
  }
  async getHouseById(houseId) {
    const house = await dbContext.House.findById(houseId)
    if (!house) {
      throw new BadRequest(`${houseId} is not a valid Id`)
    }
    return house
  }
  async getHouses() {
    const houses = await dbContext.House.find()
    return houses
  }

}

export const housesService = new HousesService()