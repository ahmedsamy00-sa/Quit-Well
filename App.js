import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import ApiErorr from "./utils/ApiError.js";
import globalError from "./middlewares/errorMiddleware.js";
import dbConnection from "./config/database.js";        
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//load env vars
dotenv.config({path: "./config.env"});

// express app
const app = express();

//connect db
dbConnection();

// middleware
app.use(helmet());
app.use(express.json());

//mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
// app.all(/.*/, (req, res ,next)=>{
//     next(new ApiErorr(`Route ${req.originalUrl} not found`, 400));
// })

//global error handling middleware
app.use(globalError);

const port = process.env.PORT || 3300;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
