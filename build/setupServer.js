"use strict";
// Application - Main Express app object
// json, urlencoded - Parse request body data
// Response - HTTP response sent to client
// Request - HTTP request received from client
// NextFunction - Pass to next middleware function
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChattyServer = void 0;
//on - This reads and understands JSON data from request bodies.
// urlencoded - This reads and understands URL-encoded data from request bodies.
//The ChattyServer class configures and starts an Express application.
// It sets up middleware functions for security, standard features, routes, and global error handling.
// It starts an HTTP server and Socket.IO for realtime communication.
//Middleware are functions that run between receiving a request and sending a response
const express_1 = require("express");
const http = __importStar(require("http"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const compression_1 = __importDefault(require("compression"));
require("express-async-errors");
const SERVER_PORT = 5000; // port for HTTP server
class ChattyServer {
    constructor(app) {
        this.app = app;
    }
    start() {
        this.securityMiddlewares(this.app);
        this.standardMiddlewares(this.app);
        this.routeMiddlewares(this.app);
        this.globalErrorHandler(this.app);
        this.startServer(this.app);
    }
    //The start method configures the middlewares and starts the server.
    // securityMiddlewares sets up security related middleware.
    // standardMiddlewares sets up middleware for standard app features.
    // routeMiddlewares sets up middleware for API routes.
    // globalErrorHandler handles errors from all parts of the app.
    // startServer starts the HTTP server using the Express app.
    // createSocketIO initializes Socket.IO for realtime communication.
    // startHttpServer starts listening on a port for HTTP requests.
    //             cors ->Allows requests to your app from other domains. Makes CORS errors go away.
    //             helmet - Adds security headers to responses. Helps prevent attacks
    //              hpp - Protects against HTTP parameter pollution. Stops bad query strings from breaking your app.
    //             cookie-session - Stores session data in the cookie. Allows you to access session data
    //            compression - Compresses responses to reduce size.
    //
    securityMiddlewares(app) {
        app.use((0, cookie_session_1.default)({
            name: 'session',
            keys: ["test1", "test2"],
            maxAge: 24 * 7 * 3600000,
            secure: false, // set to true in production when using https
        }));
        app.use((0, hpp_1.default)()); // protect against http parameter pollution attacks
        app.use((0, helmet_1.default)()); // set security-related HTTP headers
        app.use((0, cors_1.default)({
            origin: "*",
            credentials: true,
            optionsSuccessStatus: 200,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // allow these verbs
        })); // enable cors
    }
    standardMiddlewares(app) {
        app.use((0, compression_1.default)()); // compress all responses
        app.use((0, express_1.json)({ limit: '50mb' })); // parse json in request body
        app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true })); // parse urlencoded in request body
    }
    routeMiddlewares(app) { }
    //Below will handle every error in the application weather in our features or controller
    globalErrorHandler(app) { }
    startServer(app) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const httpServer = new http.Server(app);
                this.startHttpServer(httpServer);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createSockerIO(httpServer) { }
    startHttpServer(httpServer) {
        //Will listen on port 5000
        httpServer.listen(SERVER_PORT, () => {
            console.log(`Server started on port ${SERVER_PORT}`);
        });
    }
}
exports.ChattyServer = ChattyServer;
//# sourceMappingURL=setupServer.js.map