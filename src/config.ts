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

  //JWT_TOKEN=thisisasecrettoken
    // NODE_ENV=development
    // SECRET_KEY_ONE=thisisasecretcookiekey
    // SECRET_KEY_TWO=thisisanothersecretcookiekey
    // CLIENT_URL=http://localhost:3000

};

export const config: Config = new Config(); // create config object








