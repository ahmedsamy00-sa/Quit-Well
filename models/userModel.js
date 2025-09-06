import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim :true,
        required: [true , "Name is required"],
    },
    slug: {
        type: String,
        lowercase: true,
    },
    email:{
        type: String,
        required: [true , "Email is required"],
        unique: [true, "Email must be unique"],
        lowercase: true,
    },
    phone:{
        type: String,
        unique: [true, "Phone number must be unique"],
        required: [true , "Phone number is required"],
    },
    password:{
        type: String,
        required: [true , "Password is required"],
        minLength: [6 , "Password must be at least 6 characters long"],
    },
    profileImg: String,
    role:{
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);
export default User;