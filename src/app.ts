import express, {Express} from "express";

import {ChattyServer} from "./setupServer";


class Application {
    public initialize(): void {
        //The Express = express is the make sure that the app only holds an express application
        const app: Express = express(); // create express app
        const server:ChattyServer = new ChattyServer(app); // create server
        server.start();// start server
    }

}

const application:Application = new Application();
application.initialize(); // initialize application