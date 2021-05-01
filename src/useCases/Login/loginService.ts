import jwt from "jsonwebtoken";
import { ErrMessage } from "../../interfaces";
import { errMessage } from "../errMessage";
import bcrypt from "bcrypt";
const { Users } = require("../../models");

export default class LoginService {
  private createNewTokenLogin(email: string, password: string, id: string) {
    const token = jwt.sign(
      { data: { email, password, id } }, // payload
      process.env.JWT_PASSWORD,
      {
        expiresIn: "23h",
        algorithm: "HS256", // 256 bits
      }
    );
    return token;
  }

  public async newLogin(
    email: string,
    password: string
  ): Promise<ErrMessage | any> {
    const doesEmailExists = await Users.findOne({ where: { email } });
    console.log(doesEmailExists.password);
    if (!doesEmailExists) return errMessage("Email nao registrado", 404);

    const result = await bcrypt.compare(password, doesEmailExists.password);
    if (!result) return errMessage("Password incorreto", 401);

    return {
      token: this.createNewTokenLogin(email, password, doesEmailExists.id),
    };
  }
}
