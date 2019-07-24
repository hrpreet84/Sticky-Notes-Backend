const express = require('express');
const connectDB=require('./config/db');
var cors = require('cors')

//const task = require('./routes/api/task');

const app = express();
const PORT = process.env.PORT || 5000;
//get request to root

connectDB();
app.use(cors());
//set the middleware to parse data
app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/user'));
app.use('/api/auths', require('./routes/api/auth'));
app.use('/api/category',require('./routes/api/category'));
app.use('/api/notes',require('./routes/api/note'));
app.use('/api/faq',require('./routes/api/faq'));


//app.get('/:name',(req,res)=>res.send("<b>hello Nodemon !"+req.params.name+"</b>"));
//app.post('/postit',(req,res)=>res.send("<b>hello Nodemon !"+req.params.name+"</b>"));


app.listen(PORT, () => {
    console.log('SecondApp started');
});