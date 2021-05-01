import { Response, Request, NextFunction} from "express"

export default (req:Request, res:Response, next:NextFunction) => {
  console.log(`- ${req.method} ${req.path}`);
  /* Termina a operação no middleware e chama o próximo middleware ou rota */
  next();
};
