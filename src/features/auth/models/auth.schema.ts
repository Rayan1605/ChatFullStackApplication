import { IAuthDocument} from "@root/features/auth/interfaces/auth.interface";
import { model, Model, Schema} from "mongoose";
import { hash, compare} from "bcrypt";

const SALT_ROUND = 10;

    const authSchema: Schema = new Schema({

        username: { type: String},
        uId: {type: String},
        email: { type: String, unique: true},
        password: { type: String},
        avatarColor: { type: String},
        createdAt: { type: Date, default: Date.now}
    },
        {
            toJSON: {
                transform(_doc, ret){
                    delete ret.password;
                    return ret;
                }
            }
        }
)

authSchema.pre("save", async function (this: IAuthDocument, next: () => void) {
    const hashedPassword: string = await hash(this.password as string, SALT_ROUND);
    this.password = hashedPassword;
    next();
})