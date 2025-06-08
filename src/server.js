//this is the old way of importing
//const express = require("express"x);
import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
dotenv.config();

const app = express();
app.use(rateLimiter)
//built in middleware // if it is not added the the things we are typing to access will get undefined
app.use(express.json());

//our custom simple middleware
// app.use((req,res,next)=>{
//     console.log(req.method,req.path,"Hey we hit a req");
//     next();
// })
const PORT = process.env.PORT || 5001;



// app.get("/",(req,res)=>{
//   res.send("It is working");
// })

app.use("/api/transactions",transactionsRoute)
//decimal(10,2) mean
//10 is the total number of digits
//2 is the number of digits after the decimal point
//so the maximum amount is 9999999999.99 8 before decimal and 2 after
//minimum amount is 0.01


console.log("my port: ", PORT);

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is up and running on PORT:${PORT}`);
  });
});