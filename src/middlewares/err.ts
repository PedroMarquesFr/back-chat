import { Response, Request, NextFunction, Errback} from "express"

export default (err:Errback, req:Request, res:Response, next:NextFunction) => {
  res.status(500).send({ error: `${err} ou algum erro interno` });
  next();
};
