import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
    try {
        // check if we have an existing connection befor creating a new one
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        // creaete new connection if no connection found
        const db = await mongoose.connect(process.env.MONGO);
        // update the connection variable
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error);
        throw new Error(error.message)
    }
}