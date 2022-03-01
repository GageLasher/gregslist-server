import { BadRequest } from "@bcwdev/auth0provider/lib/Errors"
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
            return house
        }
    }
    async create(body){
        const house = await dbContext.Houses.create(body)
        return house
    }
}


export const housesService = new HousesService()