import mongoose from "mongoose";
import { config } from "./config.js";

const mongoConnection = () => {
    return mongoose.connect(config.mongoOptions.url);
};

export default mongoConnection;
