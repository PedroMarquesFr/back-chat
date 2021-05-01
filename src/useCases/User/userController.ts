import {Request, Response} from "express"
import UserService from "./userService";

const userService = new UserService();
export default class UserController{
    
    async newUser(req: Request, res: Response){
        const {email, password, displayName} = req.body;
        const resp = await userService.newUser({email, password, displayName})
        res.status(resp.message? resp.code:201).json(resp)
    }
}