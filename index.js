import express from "express";
import mongoose from 'mongoose';
import userRouter from "./routes/userRoute.js";
import propertyRouter from "./routes/propertyRoute.js";
import "dotenv/config";
import cors from "cors"
import orderRouter from "./routes/orderRoute.js";

//make db connection
await mongoose.connect(process.env.MONGO_URI)
console.log("db is connected!")


// create an express app
const app = express();

app.use(cors());

//Use global middleware
app.use(express.json());

app.use('/api', userRouter);
app.use('/api', propertyRouter);
app.use('/api', orderRouter);



//Use routes


//Listen to incoming request
app.listen(3003, () =>{
    console.log(`server is listening on port 3003`);
})