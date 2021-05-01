import { ErrMessage } from "../interfaces";

const errMessage = (message:string, code:number):ErrMessage => ({ message, code });

export { errMessage };
