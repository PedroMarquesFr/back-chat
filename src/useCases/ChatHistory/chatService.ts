import { ErrMessage } from "../../interfaces";
import { errMessage } from "../errMessage";
const { Users, ChatHistory } = require("../../models");

export default class ChatService {
  private async checkIfIsValid(
    message: string,
    userId: string
  ): Promise<ErrMessage> {
    if (message === undefined) return errMessage("Messagem nao enviada", 400);

    const doesUserExists = await Users.findOne({ where: { id: userId } });
    if (!doesUserExists)
      return errMessage("Usuario com id nao encontrado", 404);
    return { ok: "ok" };
  }
  public async newMessage(message: string, userId: string) {
    const isDataValid = await this.checkIfIsValid(message, userId);
    if (isDataValid.message) return isDataValid;
    try {
      const messageCreated = await ChatHistory.create({ message, userId });
      return messageCreated;
    } catch (error) {
      console.error(error);
      return errMessage("Erro interno", 500);
    }
  }
}
