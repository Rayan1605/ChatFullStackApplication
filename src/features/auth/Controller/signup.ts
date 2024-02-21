import { ObjectId} from "mongodb";
import {Request, Response} from "express";
import {joiValidation} from "@root/globels/Joi-Validation/Validation";
import { signupSchema } from "@root/features/auth/schemes/signup";

export class Signup {
    //Joi validation is to ensure that data conforms to a specific structure and set of rules before
    // it's processed by your application or stored in your database
    @joiValidation(signupSchema)
    public async signup(req: Request, res: Response): Promise<void> {
     const { username, email, password, avatarColor, avatarImage} = req.body;

    }
}
