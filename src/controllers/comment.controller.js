const express=require("express");
const router= express.Router();
const Comment= require("../models/comment.model");

// get users request route handler
router.get("", async (req,res)=>{
    try{
        const comments = await Comment.find()
        .lean()
        .exec();
        return res.status(200).send(comments);
    }
    catch(err){
        console.log(err.message);
        return res.status(200).send(err.message)
    }
})

router.post("",async (req,res)=>{
   try{
       const comment= await Comment.create(req.body);
       return res.status(201).send(comment);
    }
    catch(err){
        console.log(err.message);
        return res.send(err.message)
    }
})




module.exports=router;

