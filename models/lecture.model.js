import mongoose from "mongoose";

const lectureSchema=new mongoose.Schema({
     title: {
        type: String,
        required: [true, 'lecture title is required'],
        trim: true,
        maxLength: [100, 'lecture title cannot exceed 100 char']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'lecture description cannot exceed 500 char']
    },
    videoUrl:{
        type:String,
        required:[true,'Video URL is required']
    },
    duration:{
        type:Number,
        default:0,
    },
    publicId:{
        type:String,
        required:[true,'Public id is required']

    },
    isPreview:{
        type:Boolean,
        default:false
    },
    order:{
        type:Number,
        required:[true,'Lecture order is required']

    }


})

export const Lecture=mongoose.model("Lecture",lectureSchema);