import mongoose from "mongoose";

//export is like saying I have to share my robot
// default is basically saying this is my special robot and if you ask me for one with telling me which one then you get this one

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