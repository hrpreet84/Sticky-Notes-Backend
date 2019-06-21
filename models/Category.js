const mongoose=require('mongoose');
const CategorySchema=new mongoose.Schema({
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
    status:{
        type:Boolean
    },
    created_at:{
        type : Date, default: Date.now
    },
    updated_at:{
        type : Date, default: Date.now
    }
})
module.exports=Category=mongoose.model('Category',CategorySchema);