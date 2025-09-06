import mongoose from "mongoose";

//connect to database
const dbConnection = ()=>{
    mongoose.connect(process.env.DB_URL).then((conn)=>{
        console.log(`Database connected to ${conn.connection.host}`);
    }).catch((err)=>{
        console.log(err);
        process.exit(1);
    });
};

export default dbConnection;