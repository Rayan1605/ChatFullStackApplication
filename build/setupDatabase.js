"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = () => {
    const connect = () => {
        //Returning a promise so we will use then and catch
        mongoose_1.default.connect("mongodb://localhost:27017/chattyApp-Backend", {}).then(() => {
            console.log("Successfully connected to database");
        }).catch((error) => {
            console.log("Error connecting to database: ", error);
            return process.exit;
        });
    };
    connect();
};
//# sourceMappingURL=setupDatabase.js.map