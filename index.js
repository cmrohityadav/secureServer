import express from 'express';
import dotenv from "dotenv";
dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

// 404 handler
// It should be always at bottom

app.use((req,res)=>{
    res.status(400).json({
        status:"error",
        message:"This route not available"
    })
})

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT} in ${process.env.NODE_ENV} mode`)
})


