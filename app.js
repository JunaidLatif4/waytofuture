//                  HTML + CSS + JavaScript [Node.js ,  {FS , NPM Packages (Express , Pug)} ]                   \\

        // Requried Modules & NPM Packages :
const express = require('express');
const pug = require('pug');
const path = require('path');
const mongoose = require('mongoose');


        // Initialiging Modules & NPM Packages :
const app = express();
app.set('view engine' , 'pug');
mongoose.connect('mongodb://localhost/waytofuture' , {useNewUrlParser: true , useUnifiedTopology: true});

        // Including Directories :
app.set('views' , path.join(__dirname , "Pug-Templates"));
app.use('/static' , express.static('Statics'));
        // Encoding URL of Post Request Data :
                // This will help to Decode the Contact Form data that is comming as a Url :
app.use(express.urlencoded());

        // Defining Mongoose Schema For contact :
var contactSchema = new mongoose.Schema({
        name: String,
        email: String,
        degree: String,
        priori: String,
        agree: String,
        message: String 
});
        // Compiling Schema & Making Collection :
var contact = mongoose.model('ContactForm' , contactSchema);


        // END-Points :
app.get('/' , (req , res)=>{
        res.render('home');
});
app.get('/home' , (req , res)=>{
        res.render('home');
});
app.get('/services' , (req , res)=>{
        res.render('services');
});
app.get('/about' , (req , res)=>{
        res.render('services');
});
app.get('/contact' , (req , res)=>{
        res.render('contact');
});

// Post request of Contect Form :
app.post('/contact' , (req , res)=>{
                // Extracting the Data From the Contact Form , that is Comming as a Post Request :
        var conatctData = new contact(req.body);
        conatctData.save().then(()=>{   // If the Data is Saved Successfully.
                res.render("contactsub");
        }).catch(()=>{  // In case of Error.
                res.status(404).send("404 Error")
        });

});

        // Starting PORT :
app.listen(80 , ()=>{
        console.log('The Server is Started at PORT 80...............');
});
