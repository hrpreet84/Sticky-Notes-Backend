const mongoose=require('mongoose');
const NoteSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type:String
    },
    id:{
        type:String
    },
    text:{
        type:String,default: "Enter some text"
    },
    grid: {
                 i:{type:String},
                 x:{type:Number},
                 y: {type:Number},
                 w: {type:Number},
                 h : {type:Number},
                 isDraggable: {type:Boolean,default:true}
               },
    contentEditable:{
        type : Boolean,default: true
    },
    timeStamp:{
        type : Date,default: Date.now
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },
    color:{
        type:String
    },
    updated_at:{
        type : Date, default: Date.now
    }
})
module.exports=Note=mongoose.model('note',NoteSchema);


    //       "id": "3effea2c-fc90-98e0-51d0-22c32efb2177",
    //       "text": "Hey I am Ajain... ",
    //       "title": "Hello",
    //       "grid": {
    //         "i": "3effea2c-fc90-98e0-51d0-22c32efb2177",
    //         "x": 0,
    //         "y": null,
    //         "w": 2,
    //         "h" : 2,
    //         "isDraggable": false
    //       },
    //       "contentEditable": true,
    //       "timeStamp": "13 Feb 2017 2:53 PM"
    //     }