import express from "express";
import bcrypt from "bcryptjs";
import cors from "cors";
import mongoose from "mongoose";
import mongoConnection from "./src/config/mongoConfig.js";
import { config } from "./src/config/config.js";

const app = express();
const PORT = config.port

app.use(cors())
app.use(express.json())

// base get api
app.get("/", (req, res) => {
    res.json({
        status: true,
        message: "Library Management System"
    })
})

// mongo connection
mongoConnection()
    .then(() => {
        app.listen(PORT, (err) => {
            if (err) {
                console.log("SERVER COULD NOT STARTED");
            } else {
                console.log("SERVER STARTED AT PORT: ", PORT);
            }
        });
    })
    .catch((err) => {
        console.log(err.message);
        console.log("MONGO DB CONNECTION ERROR");
    });