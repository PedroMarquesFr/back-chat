import { Request, Response } from "express";

export default class ChatController{
    public async postHistory(req:Request, res:Response){
        const {message, userId} = req.body;
        // const resp = await postNewMessage()
    }
    public async getHistory(req:Request, res:Response){

    }
}