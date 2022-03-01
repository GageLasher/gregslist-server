import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";

export class HousesController extends BaseController{
    constructor(){
        super('api/houses')
        this.router
        .get('', this.getHouses)
        .get('/:id', this.getById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.create)
        .put('/:id', this.edit)
        .delete('/:id', this.remove)
    }
    async getHouses(req, res, next){
        try {
            const house = await housesService.getHouses(req.query)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }
    async getById(req, res, next){
        try {
            const house = await housesService.getById(req.params.id)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }
    async create(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            const house = await housesService.create(req.body)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }
    async edit(req, res, next){
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const update = await housesService.edit(req.body)
            return res.send(update)
        } catch (error) {
            next(error)
        }
    }
    async remove(req, res, next){
        try {
            const userId = req.userInfo.id
            const houseId = req.params.id
            await housesService.remove(houseId, userId)
            return res.send("deleted listing")
        } catch (error) {
            next(error)
        }
    }
}