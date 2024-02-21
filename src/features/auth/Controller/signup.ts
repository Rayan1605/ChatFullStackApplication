import { ObjectId} from "mongodb";
import {Request, Response} from "express";

export class Signup {
    public async signup(req: Request, res: Response): Promise<void> {
        const {email, username, password, avatarColor} = req.body;

    }
}
