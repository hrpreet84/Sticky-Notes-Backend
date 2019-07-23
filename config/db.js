const mongoose=require('mongoose');
const config=require('config');
const db=config.get('mongoConn');

    
const getConnection=async ()=>{
    try {
     await mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false
    });
    console.log("Connected Successfully");
} catch (error) {
    console.log(error);   
 console.log("unable to connect!");
 process.exit();   
}
};
module.exports=getConnection;