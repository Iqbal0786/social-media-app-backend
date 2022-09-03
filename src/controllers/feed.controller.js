const express= require("express");
const router= express.Router();
const Feed=require("../models/feed.model")
const {uploadMultiple}= require("../middlewares/file-uploads");
const fs= require("fs")

router.post("",uploadMultiple("profile_pic"),async(req,res)=>{
    try {
        const filepaths= req.files.map((file)=>file.path);
        const feed= await Feed.create({
           title:req.body.title,
           user_id:req.body.user_id,
         profile_pic: filepaths,
        });

        return res.status(201).send(feed);
        
    } catch (error) {
         return res.status(500).send(error.message)
    }
    
})

router.get("",async(req,res)=>{
    try {
        const feeds= await Feed.find().lean().exec();
        return res.status(200).send(feeds)
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.delete("/:postId",async(req,res)=>{
    try {
        const exsitingUser= await Feed.findById(req.params.postId).lean().exec();
        const profilePath= exsitingUser.profile_pic;
        // let user= await User.findByIdAndUpdate({});
        const updated= await Feed.findByIdAndDelete(req.params.postId).lean().exec();

           profilePath.map((path)=>{
            fs.unlinkSync(path)
           })

        return res.status(201).send({message:"deleted"});
    } catch (error) {
        return res.status(500).send(error.message);
    }
})
module.exports= router;