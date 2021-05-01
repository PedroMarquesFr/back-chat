import { ErrMessage, User } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";
import { errMessage } from "../errMessage";
import bcrypt from "bcrypt";
const { Users } = require("../../models");

export default class UserService {
  validateInfoUser({ email, password, displayName }: User): ErrMessage {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      email === undefined ||
      password === undefined ||
      displayName === undefined
    ) {
      return errMessage("Dados Invalidos", 401);
    }
    if (!emailRegex.test(email)) {
      return errMessage("Email incorreto", 401);
    }
    return { ok: "ok" };
  }

  cryptPassword(password:string):string{
    const saltRounds = 5;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash)
    return hash
  }

  async newUser({
    email,
    password,
    displayName,
  }: User): Promise<ErrMessage | any> {
    const isDataValid = this.validateInfoUser({ email, password, displayName });
    if (isDataValid.message) {
      return isDataValid;
    }
    const doesEmailExists = await Users.findOne({ where: { email } });
    if (doesEmailExists) {
      return errMessage("Email ja registrado", 400);
    }
    try {
      const wasCreated = await Users.create({
        id: uuidv4(),
        email,
        password:this.cryptPassword(password),
        displayName,
      });
      return wasCreated;
    } catch (error) {
      console.error(error);
      return errMessage("Erro interno", 500);
    }
  }
}
