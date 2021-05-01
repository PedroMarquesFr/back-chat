import { Request, Response } from "express";
import LoginService from "./loginService";

const loginService = new LoginService();

export default class LoginController{
    async newLogin(req:Request,res:Response){
        const {email, password} = req.body;
        const result = await loginService.newLogin(email, password);

        res.status(result.message?result.code:201).json(result)
    }

}

