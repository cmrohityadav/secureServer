import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crpto from 'crypto'
import { match } from "assert";
import { type } from "os";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        maxLength:[50,'Name cannot exceed 50 characters']
    },
    email:{
         type:String,
        required:[true,'Email is required'],
        trim:true,
        unique:true,
        lowercase:true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email address"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[8,"password must be atleast 8 characters"],
        select:false
    },
    role:{
        type:String,
        enum:{
            values:['student','instructor','admin'],
            message:'Please select a valid role',

        },
        default:'student'
    },
    avatar:{
        type:String,
        default:'default-avatar.png'

    },
    bio:{
        type:String,
        maxLength:[200,"Bio cannot exceed 200 characters"]
    },
    enrolledCourses:[{
        course:{
            type:mongoose.Schema.Types.Boolean,
            ref:'Course'
        },
        enrolledAt:{
            type:Date,
            default:Date.now
        }
    }],
    createdCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    lastActive:{
        type:Date,
        default:Date.now
    }

},{
    timestamps:true
})



export const User=mongoose.model('User',userSchema);
