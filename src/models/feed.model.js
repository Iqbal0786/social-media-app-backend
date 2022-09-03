const mongoose= require("mongoose");

 // creating  feed  schema
 
    const feedSchema= new mongoose.Schema({
        title:{type:String , required:true},
        profile_pic:[{type:String}],
        user_id:{
            type:mongoose.Schema.Types.ObjectId , ref:"user",required:true
        },
       
  
    },{
        versionKey:false,
        timestamps:true
    });
   
    // creating the post model means posts collections 
    module.exports= mongoose.model("feed",feedSchema);