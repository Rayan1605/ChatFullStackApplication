import express, {Express} from "express";
import {ChattyServer} from "./setupServer";
import databaseConnection from "./setupDatabase"
import {config} from "./config";

class Application {
        public initialize(): void {
            this.loadConfig();
            databaseConnection();
            //The Express = express is the make sure that the app only holds an express application
            const app: Express = express(); // create express app

            const server:ChattyServer = new ChattyServer(app); // create server
            server.start();// start server
        }

        private loadConfig(): void {
            // load configuration settings
               config.validateConfig();
               config.cloudinaryConfig();
        }


}


const application:Application = new Application();
application.initialize(); // initialize application


// Setting up the cloud area because we are going to be adding or uploading files to the cloud
// cloud ordinary is just a cloud platform that is used to store files and manipulate them


