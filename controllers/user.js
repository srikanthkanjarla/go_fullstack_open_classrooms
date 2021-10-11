const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/things");

module.exports.signup = (req,res,next)=>{
bcrypt.hash(req.body.password,10).then(hash=>{
    const user = new User({
        email:req.body.email,
        password:hash
    })

    user.save().then(()=>{
        res.status(201).json({message:"user added successfully"})
    })
    .catch(error=>{
        res.status(500).json({error:error})
    })
})
}

exports.signin = (req,res,next)=>{
User.findOne(req.body.email).then(user=>{
    if(!user){
        res.status(401),json({message:new Error('User not found')})
    }
    bcrypt.compare(req.body.password,user.password).then(valid =>{
        if(!valid){
            res.status(401).json({message:new Error('Incorrect Password')})
        }
        const token = jwt.sign({userId:user._id},'RANDOM TOKEN STRING',{expiresIn:'24h'})
        res.status(200).json({userId:user._id,token:token})
    })
    .catch(error=>{
        res.status(500).json({error:error})
    })
})
.catch(error=>{
    res.status(500).json({error:error})
})
}