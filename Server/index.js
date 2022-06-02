import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectData from "./src/config/MongoDB.js";
import authRouter from "./src/routers/auth.js";
import hotelsRouter from "./src/routers/hotels.js"
import roomsRouter from "./src/routers/rooms.js";
import usersRouter from "./src/routers/users.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app = express();
connectData()


mongoose.connection.on("disconnected", ()=> {
    console.log(" mongoDB Disconnected");
})



// middlewares
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/api/hotels",hotelsRouter);
app.use("/api/rooms",roomsRouter);
app.use("/api/users",usersRouter);


app.use((err,req, res, next) => {
    // console.log("hi im a middleware!")
    // next()
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong";
    return res.status(500).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


const PORT = process.env.PORT || 1000;
app.listen(PORT, console.log(`server run in port ${PORT}`));