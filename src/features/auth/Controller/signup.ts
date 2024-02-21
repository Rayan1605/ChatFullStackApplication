import { ObjectId} from "mongodb";
import {Request, Response} from "express";
import {joiValidation} from "@root/globels/Joi-Validation/Validation";
import { signupSchema } from "@root/features/auth/schemes/signup";
import {IAuthDocument} from "@root/features/auth/interfaces/auth.interface";
import {authService} from "@services/DB/AuthService";
import {BadRequestError} from "@root/globels/error-handler";

export class Signup {
    //Joi validation is to ensure that data conforms to a specific structure and set of rules before
    // it's processed by your application or stored in your database
    @joiValidation(signupSchema)
    public async signup(req: Request, res: Response): Promise<void> {
     const { username, email, password, avatarColor, avatarImage} = req.body;
     const CheckifUserExist: IAuthDocument = await authService.getUserByUsernameOrEmail(username, email);

     if (CheckifUserExist) {
        throw new BadRequestError("User already exist");
     }

    }
}
