const express = require("express");
const router = express.Router()
const Thing = require("../models/things");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post('/',auth,multer,(req,res,next)=>{
req.body.thing = json.parse(req.body.thing)
const url = req.protocol+'://'+req.get('host');

    const thing = new Thing({
        title:req.body.title,
        description:req.body.description,
        imageUrl:url+'/images/'+req.file.filename,
        userId:req.body.userId,
        price:req.body.price
    })

    thing.save().then(()=>{
        res.status(201).json({message:'Thing created successfully!'});
    })
    .catch((error)=>{
        res.status(400).json({error:error})
    })
    
})

router.get('/:id',auth,(req,res,next)=>{
Thing.findOne({
    _id:req.params.id
})
.then((thing)=>{
    res.status(200).json(thing)
})
.catch((error)=>{
    res.status(404).json({error:error})
})
})

router.put('/:id',auth,multer,(req,res,next)=>{
    const thing = new Thing({
        _id:req.params.id,
        title:req.body.title,
        description:req.body.description,
        imageUrl:req.body.imageUrl,
        userId:req.body.userId,
        price:req.body.price
    })

    Thing.updateOne({_id:req.params.id},thing).then(()=>{
        res.status(201).json({message:'Thing updated successfully!'});
    })
    .catch((error)=>{
         
        res.status(400).json({error:error})
    })
})

router.delete('/:id',auth,(req,res,next)=>{
Thing.deleteOne({_id:req.params.id})
.then(()=>{
    res.status(200).json({message:'Deleted'})
})
.catch((error)=>{
    res.status(404).json({error:error})
})
})

router.get('/',auth,(req,res,next)=>{
    Thing.find().then((things)=>{
        res.status(200).json(things)
    })
    .catch(error=>{
        res.status(400).json({error:error})
    })
})

module.exports = router;