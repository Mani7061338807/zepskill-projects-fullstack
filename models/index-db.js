const mongoose =  require('mongoose');

const newSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:String,
    image:String,
    package:Number,
    createdAt:{
        type:Date,
        deafualt:Date.now
    },
    deadline:{
        type:Date,
        default:Date.now
    },
    job_type:{
        type:String,
        deault:'full time'
    },
    appliedUser:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
   ],
   questions:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'question'
    }
   ]
})

const job = mongoose.model("jobs",newSchema);
module.exports = job;

