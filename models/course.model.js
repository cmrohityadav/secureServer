import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxLength: [100, 'course title cannot exceed 100 char']
    },
    subtitle: {
        type: String,
        trim: true,
        maxLength: [200, 'course subtitle cannot exceed 200 char']
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, 'course description cannot exceed 500 char']
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        trim: true,
    },
    level: {
        type: String,
        enum: {
            values: ["beginner", 'intermediate', 'advanced'],
            message: 'please select a valid course'
        },
        default: 'beginner'
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'course price must be non- negative number']

    },
    thumbnail: {
        type: String,
        required: [true, 'course thumbnail is required'],

    },
    enrolledStudent: [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    lectures:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Lecture'
    }],
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: [true, 'course instructor is required'],

    },
    isPublished:{
        type:Boolean,
        default:false
    },
    totalDuration:{
        type:Number,
        default:0
    },
    totalLectures:{
        type:Number,
        default:0
    }


},{
 timestamps:true,
    // for virtuals
    toJSON:{virtuals:true},
    toObject:{virtuals:true}   
})

courseSchema.virtual('averageRating').get(function(){
    return 0;
})

courseSchema.pre('save',function(next){
    if(this.lectures){
        this.totalLectures=this.lectures.length;
    }

    next();
})

export const Course=mongoose.model('Course',courseSchema);