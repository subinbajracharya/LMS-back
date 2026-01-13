import express from "express";
import cors from "cors";
import mongoConnection from "./src/config/mongoConfig.js";
import { config } from "./src/config/config.js";
import authRouter from "./src/routes/authRouter.js"
import userRouter from "./src/routes/userRouter.js";
import bookRouter from "./src/routes/bookRouter.js";
import borrowRouter from "./src/routes/borrowRouter.js";
import reviewRouter from "./src/routes/reviewRouter.js";

const app = express();

app.use(cors({
    credentials: true
}))
// app.use(cookieParser());
app.use(express.json())

const PORT = config.port

// base get api
app.get("/", (req, res) => {
    return res.json({
        status: "success",
        message: "Library Management System"
    })
})

// static serve
app.use("/public", express.static("assets"));

// Auth routes
app.use("/api/v1/auth", authRouter)

// User routes
app.use("/api/v1/user", userRouter)

// Book routes
app.use("/api/v1/books", bookRouter)

// Borrow routes
app.use("/api/v1/borrow", borrowRouter);

// Review routes
app.use("/api/v1/review", reviewRouter);

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