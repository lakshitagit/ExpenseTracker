import express from "express"
import {getTransactionsByUserId ,getAllTransactions, createTransaction , getSummary, deleteTransaction} from "../controller/transactionsController.js";
const router = express.Router()

// app.get("/", (req, res) => {
//   res.send("It is working");
// });

//to use //title, amount, category, user_id all these we need a middle ware

// router.get("/", (req, res) => {
//   res.send("It is working");
// });

router.post("/",createTransaction);

//get all the transactions list
router.get("/",getAllTransactions);

router.get("/:userId",getTransactionsByUserId);
//the above get api will return an empty array is the user enters the user id which is not present in the database

router.delete("/:id",deleteTransaction);

router.get("/summary/:userId",getSummary);

export default router