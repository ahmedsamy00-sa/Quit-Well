import mongoose from "mongoose";

//connect to database
const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URL).then((conn)=>{
        console.log(`Database connected to ${conn.connection.host}`);
    });
};

export default dbConnection;