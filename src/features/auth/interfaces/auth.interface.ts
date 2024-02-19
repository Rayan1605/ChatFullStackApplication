import { Document} from "mongoose";
import { ObjectId} from "mongodb";

 declare global {
     namespace Express {
         interface Request {
             currentUser?: AuthPayload; //This will be in error if no user logged in so I made it optional so no
             // error will be thrown
         }
     }
 }

 export interface AuthPayload {

   userId: string;
   uId: string;
    email: string;
    username: string;
    avatarColor: string
     iat: number;
 }

 export interface IAuthDocument extends Document {
     _id: string | ObjectId;
     uId: string;
     username: string;
     email: string;
     password?: string;
     avatarColor: string;
     createdAt: Date;
     comparePassword(password: string): Promise<boolean>;
     hashPassword(password: string): Promise<string>;



 }