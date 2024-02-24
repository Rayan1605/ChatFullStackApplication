import { ObjectId} from "mongodb";
import {Request, Response} from "express";
import {joiValidation} from "@root/globels/Joi-Validation/Validation";
import { signupSchema } from "@root/features/auth/schemes/signup";
import {IAuthDocument, ISignUpData} from "@root/features/auth/interfaces/auth.interface";
import {authService} from "@services/DB/AuthService";
import {BadRequestError} from "@root/globels/error-handler";
import {Helpers} from "@root/globels/helpers";
import {UploadApiResponse} from "cloudinary";
import {uploads} from "@root/globels/cloudinary-upload";
import HTTP_STATUS from "http-status-codes";

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

         const authObjectId: ObjectId = new ObjectId();
         const userObjectId: ObjectId = new ObjectId();
         const uid = `${Helpers.generateRandomColor(12)}`
         const authData: IAuthDocument = Signup.prototype.signupData({

                _id: authObjectId,
                uId: uid,
                username,
                email,
                password,
                avatarColor
         });
    const result: UploadApiResponse = await uploads(avatarImage, `${userObjectId}`,true,true) as UploadApiResponse;

     if (!result?.public_id) {
         throw new BadRequestError("Error occurred: File upload failed. Try again");
     }

     res.status(HTTP_STATUS.CREATED).json({message: "User created successfully", authData});

    }

    private signupData(data: ISignUpData): IAuthDocument {
        const {_id, username, email, uId,password, avatarColor} = data;
        return {
            _id,
            uId,
            username: Helpers.firstletter(username),
            email: Helpers.lowerEmail(email),
            password,
            avatarColor,
            createdAt: new Date()
        } as unknown as IAuthDocument;

    }
}
