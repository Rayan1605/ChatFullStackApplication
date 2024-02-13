import mongoose from "mongoose";

export default () => {

    const connect = () => {
        //Returning a promise so we will use then and catch
    mongoose.connect("mongodb://localhost:27017/chattyApp-Backend", {

    }).then(() => {
      console.log("Successfully connected to database");
    }).catch((error) => {
      console.log("Error connecting to database: ", error);
      return process.exit;
    })

    }
    connect();

};