const express=require("express");
const app=express();
const mongoose = require('mongoose');
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
mongoose.connect("mongodb://127.0.0.1:27017/ContactDance")
const path=require("path");
const port=8000;
const ContactSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: String,
    gender: String, 
    address: String
  });
  const Contact = mongoose.model('Contact',ContactSchema);
app.use('/static',express.static('static'));
app.use(express.urlencoded({extended:true}));
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.get('/',(req,res)=>{
    const params={};
res.render('home.pug',params);
})
app.post('/contact',(req,res)=>{
    var mydata=new Contact(req.body);
    mydata.save().then(()=>{
        res.send("the item has been saved to database")
    }).catch(()=>{
        res.status(400).send("the item cannot be added")
    })
})
app.get('/contact',(req,res)=>{
    const params={};
res.render('contact.pug',params);
})


app.listen(port,()=>{
    console.log(`app run successfully on port ${port}`);
})
