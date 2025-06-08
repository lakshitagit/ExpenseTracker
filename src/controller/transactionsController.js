import { sql } from "../config/db.js";
export async function getTransactionsByUserId(req,res) {
  try {
    const { userId } = req.params;
    console.log(userId);

    const transactions = await sql`
            SELECT * FROM transactions WHERE user_id= ${userId} ORDER BY created_at DESC
            `;
    res.status(201).json(transactions);
  } catch (error) {
    console.log("Error getting the transaction", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAllTransactions(req,res) {
    try{
        const transactions = await sql`
        SELECT * FROM transactions ORDER BY created_at DESC
        `;
        if(transactions.length===0){
            res.status(404).json({message:"No transactions found"})
        }
        res.status(201).json(transactions);
    }
    catch(error){
        console.log("Error getting the transaction", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createTransaction(req,res){
      try {
        const { title, amount, category, user_id } = req.body;
        if (!title || !user_id || !category || amount === undefined) {
          return res.status(400).json({ message: "All fields are required" });
        }
        const transaction = await sql`
            INSERT INTO transactions(user_id,title,amount,category)
            VALUES (${user_id},${title},${amount},${category})
            RETURNING *
            `;
        console.log(transaction);
        res.status(201).json(transaction[0]);
      } catch (error) {
        console.log("Error creating the transaction", error);
        res.status(500).json({ message: "Internal server error" });
      }

}

export async function deleteTransaction(req,res){
      try {
        const { id } = req.params;
        console.log(typeof id);
    
        //if the user tries to delete a transation using string then it will throw an error
        if (isNaN(parseInt(id))) {
          return res.status(400).json({ message: "Invalid transaction id" });
        }
    
        const result = await sql`
            DELETE FROM transactions WHERE id = ${id} 
            RETURNING *
            `;
        if (result.length === 0) {
          return res.status(404).json({ message: "Transaction not found" });
        }
        res.status(200).json({ message: "Transaction deleted successfully" });
      } catch (error) {
        console.log("Error deleting the transaction", error);
        res.status(500).json({ message: "Internal server error" });
      }

}

export async function getSummary(req,res){

      try {
        const { userId } = req.params;
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}
            `;
        //income + expense - amount >0 income
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0
            `;
    
        //amount<0 expense
        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userId} AND amount<0
            `;
    
        res.status(200).json({
          balance: balanceResult[0].balance,
          income: incomeResult[0].income,
          expenses: expenseResult[0].expenses,
        });
      } catch (error) {
        console.log("Error getting the summary", error);
        res.status(500).json({ message: "Internal server error" });
      }

}