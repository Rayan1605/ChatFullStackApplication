import {IAuthDocument} from "@root/features/auth/interfaces/auth.interface";

class AuthService {

    // We want to see if the user or email exists in the database
    public async getUserByUsernameOrEmail(username: string, email: string): Promise<IAuthDocument> {
    const query = {}
    }
}