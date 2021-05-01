import { Request, Response } from "express";
import ChatService from "./chatService";
const { Users, ChatHistory } = require("../../models");

const chatService = new ChatService();
export default class ChatController {
  public async postHistory(req: Request, res: Response) {
    const { message, userId } = req.body;
    const result = await chatService.newMessage(message, userId);
    res.status(result.code ? result.code : 201).json(result);
  }
  public async getHistory(req: Request, res: Response) {
    try {
      const resp = await ChatHistory.findAll();
      return res.json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  public async getMessagesFromUser(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const resp = await Users.findAll({
        where: { id },
        include: [{ model: ChatHistory, as: "chat" }],
      });
      return res.json(resp);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
}
