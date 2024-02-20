import { Document} from "mongoose";
import { ObjectId} from "mongodb";

 declare global {
     //
     namespace Express {
         // interface Request  is used to add a new property to the Request object
         // changes the Express framework (used for making web applications) to include a new piece of
         // user information in each request. This means whenever a request is made (like loading a page),
         // it can include data about the logged-in user, but only if someone is logged in.

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