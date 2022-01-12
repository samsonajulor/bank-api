import { IUser } from "../../src/utils/interfaces/interface";
declare global {
 namespace Express {
  interface Request {
   user?: IUser;
  }
 }
}