import { Application, json, urlencoded, Response, Request, NextFunction}  from  'express';
import * as http from "http";
export class ChattyServer {
   private app: Application;
       constructor(app: Application) {
           this.app = app;
       }

       public start(): void {}

          private securityMiddlewares(app:Application): void {}

         private standardMiddlewares(app:Application): void {}

         private routeMiddlewares(app:Application): void {}

    //Below will handle every error in the application weather in our features or controller
          private globalErrorHandler(app:Application): void {}
          private startServer(app:Application): void {}
          private createSockerIO(httpServer: http.Server): void {}

        private 

}
