import {IAuthDocument} from "@root/features/auth/interfaces/auth.interface";
import {Helpers} from "@root/shared/globels/helpers/helpers";
import {AuthModel} from "@root/features/auth/models/auth.schema";



class AuthService {
    public async createAuthUser(data: IAuthDocument): Promise<void> {
        await AuthModel.create(data);
    }

    public async updatePasswordToken(authId: string, token: string, tokenExpiration: number): Promise<void> {
        await AuthModel.updateOne({ _id: authId }, {
            passwordResetToken: token,
            passwordResetExpires: tokenExpiration
        });
    }
    // We want to see if the user or email exists in the database
    //Redis only hold the user data so we will be making a request to the database to see if the user or email exists
    // by querying the database
    public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
        const query = {
            $or: [{ username: Helpers.firstLetterUppercase(username) }, { email: Helpers.lowerCase(email) }]
        };
        const user: IAuthDocument = (await AuthModel.findOne(query).exec()) as IAuthDocument;
        return user;
    }

    public async getAuthUserByUsername(username: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({ username: Helpers.firstLetterUppercase(username) }).exec()) as IAuthDocument;
        return user;
    }
// We are using the findOne method to find the first document that matches the query and we are using the exec method to execute the query
    // we are looking in MongoDB for the user or email
    public async getAuthUserByEmail(email: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({ email: Helpers.lowerCase(email) }).exec()) as IAuthDocument;
        return user;
    }

    public async getAuthUserByPasswordToken(token: string): Promise<IAuthDocument> {
        const user: IAuthDocument = (await AuthModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        }).exec()) as IAuthDocument;
        return user;
    }
}

export const authService: AuthService = new AuthService();
