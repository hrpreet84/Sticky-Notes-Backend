const mongoose=require('mongoose');
const NoteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    color:{
        type:String
    },
    created_at:{
        type : Date,default: Date.now
    },
    updated_at:{
        type : Date, default: Date.now
    }
})
module.exports=Note=mongoose.model('note',NoteSchema);