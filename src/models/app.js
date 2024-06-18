const express=require("express");
const app=express();
const hbs=require("hbs");
const port=process.env.port || 3000;
const mongoose=require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/YoutubeRegistration")
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const path=require("path");
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");
app.use(express.static(static_path));
app.use(express.static(template_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);
app.use(express.urlencoded({extended:true}));
const ContactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: String,
    gender: String, 
    Email: String,
    phone:String,
    password:String,
    confirmpassword:String,
    answer:String
  });
  const Register = mongoose.model('register',ContactSchema);
  app.post('/register',(req,res)=>{
    var mydata=new Register(req.body);
    if(mydata.password!=mydata.confirmpassword){
        res.send("password does not match")
    }else{
        mydata.save().then(()=>{
            res.send("the item has been saved to database")
            res.render('index');
        }).catch(()=>{
            res.status(400).send("the item cannot be added")
        })
    }
})
   
app.get('/',(req,res)=>{
    res.render("Index");
})
app.get('/login',(req,res)=>{
    res.render("Login");
})
app.get('/register',(req,res)=>{
    res.render("register");
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})