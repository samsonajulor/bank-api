import jwt from "jsonwebtoken"
import {Request, Response, NextFunction} from 'express'
import User from "../models/users.models"


export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
 let token: string | undefined

 if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
  token = req.headers.authorization.split(' ')[1]
 }

 if (!token) {
  return res.status(401).json({
   status: "error",
   message: "You are not authorized! 🚨",
  });
 }
 try {
  const decodedToken: any = jwt.verify(
   token as string,
   process.env.JWT_SECRET as string
  );
  const user = await User.findOne({ email: decodedToken.email });
  req.user = user;
  next();
 } catch (err) {
  // console.log(err);
  return res.status(401).json({
   status: "error",
   message: "You are not authorized! 🚨 !!!",
  });
 }
}