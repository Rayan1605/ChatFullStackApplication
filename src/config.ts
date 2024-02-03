//These are used to organize and manage configuration settings for application
//These can include things like database connection or API keys
//It good to have this because we can change, define and access these setting throughout our application

//The dotenv package is used to read the .env file and make those values available to the application
import dotenv from "dotenv";

dotenv.config({}); // read .env file

// The | symbol is used to define a type that can be one of several types so it can be string or undefined
class Config {
    public DATABASE_URL: string | undefined;
    public JWT_TOKEN: string | undefined;
    public SECRET_KEY_ONE: string | undefined;
    public SECRET_KEY_TWO: string | undefined;
    public CLIENT_URL: string | undefined;

  private readonly DEFAULT_DATABASE_URL =   ' mongodb://localhost:27017/chattyApp-Backend'
    constructor() {
        this.DATABASE_URL = process.env.DATABASE_URL;
        this.JWT_TOKEN = process.env.JWT_TOKEN;
        this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE;
        this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO;
        this.CLIENT_URL = process.env.CLIENT_URL;
    }

};

export const config: Config = new Config(); // create config object








