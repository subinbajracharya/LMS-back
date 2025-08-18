import express from "express";
import cors from "cors";
import mongoConnection from "./src/config/mongoConfig.js";
import { config } from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js"

const app = express();

app.use(cors())
app.use(express.json())

const PORT = config.port

// base get api
app.get("/", (req, res) => {
    return res.json({
        status: "success",
        message: "Library Management System"
    })
})

app.use("/api/v1/auth", authRouter)

// mongo connection
mongoConnection()
    .then(() => {
        app.listen(PORT, (err) => {
            if (err) {
                console.log(err)
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