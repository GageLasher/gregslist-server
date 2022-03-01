import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext"

class HousesService {
    async getHouses(query = {}){
        const houses = await dbContext.Houses.find(query)
        return houses
    }
    async getById(id){
        const house = await dbContext.Houses.findById(id)
        if(!house){
            throw new BadRequest("invalid house id")
        }
        return house
    }
    async create(body){
        const house = await dbContext.Houses.create(body)
        return house
    }
    async edit(update){
        const original = await this.getById(update.id)
        if (original.creatorId.toString()!== update.creatorId) {
            throw new Forbidden("You do not own this house")
        }
        original.size = update.size ? update.size : original.size
        original.bedrooms = update.bedrooms ? update.bedrooms : original.bedrooms
        original.bathrooms = update.bathrooms ? update.bathrooms : original.bathrooms
        original.levels = update.levels ? update.levels : original.levels


        await original.save()
        return original

    }
    async remove(houseId, userId){
        const house = await this.getById(houseId)
        if (house.creatorId.toString()!== userId) {
            throw new Forbidden("this isn't your house")
        }
        await dbContext.Houses.findByIdAndDelete(houseId)
    }
}


export const housesService = new HousesService()