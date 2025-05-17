import express from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

// Global rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	message:"Too many request from this IP, please try letter"

})

// security middleware
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(hpp());
app.use("/api",limiter)

//logger middleware
if(process.env.NODE_ENV== "development"){
    app.use(morgan('dev'));
}

// Body Parser middleware 
app.use(express.json({limit:'10kb'}));
app.use(express.urlencoded({extended:true,limit:'10kb'}));


// Global Error Handler
app.use((error,req,res,next)=>{
    console.error(error.stack);
    res.status(error.status || 500).json({
        status:'error',
        message:error.message || 'Internal server error',
        ...(process.env.NODE_ENV=='development' && {stack:error.stack})
    })
})


//API Routes



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


