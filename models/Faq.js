const mongoose=require('mongoose');
const FaqSchema=new mongoose.Schema({
    
    question:{
        type:String
    },
    answer:{
        type:String
    }
})
module.exports=Category=mongoose.model('Faq',FaqSchema);