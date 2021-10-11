const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//const { MongoClient } = require('mongodb');
const path = require("path");
const app = express();
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
app.use('/images',express.static(path.join(__dirname,'images')))

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

mongoose.connect('mongodb+srv://anu:anu612@cluster0.vxpcm.mongodb.net/openclass?retryWrites=true&w=majority') 
.then(()=>{
    console.log('successfully connected to mongo db');
})
.catch((error)=>{
    console.log('failed to connect to the mongo db');
    console.log(error);
})

app.use("/api/stuff",stuffRoutes);
app.use("/api/auth",userRoutes);
// const uri = "mongodb+srv://anu:anu612@cluster0.vxpcm.mongodb.net/openlearn?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//     if(err){
//         console.log(err);
//     }
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   console.log('connected to the DB')
//   client.close();
// });





module.exports = app;

