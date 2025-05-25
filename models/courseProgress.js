import mongoose from "mongoose";

const lectureProgressSchema=new mongoose.Schema({
    lecture:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lecture',
        required:[true,'Lecture reference is required']
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    watchTime:{
        type:Number,
        default:0
    },
    lastWatched:{
        type:Number,
        default:Date.now
    }
})