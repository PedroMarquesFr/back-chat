import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
// const userService = require('../services/userService');

const segredo = 'senhasecretashiii';

export default (requireAdmin) => {
  return async (req:Request, res:Response, next:NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: 'Token não encontrado' });
    try {
      const decoded = jwt.verify(token, segredo);
      console.log('decoded: ', decoded, (decoded.data.role !== 'admin'), requireAdmin);
      if (requireAdmin && decoded.data.role !== 'admin') {
        return res.status(403).json({
          message: 'Only admins can register new admins',
        });
      }
      // const user = await userService.checkUserByEmail(decoded.data.email);
      if (user.message) {
        res.status(404).json({ message: 'Erro ao procurar usuario do token.' });
      }
      req.user = decoded.data;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token expirado ou inválido', err: err.message });
    }
  };
};
