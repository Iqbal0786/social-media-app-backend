const mongoose= require("mongoose");

// ---------- Starting the comment collections crud op -----
const commentSchema= new mongoose.Schema({
    content:{type:String , required:true},
    feed_id:{
        type:mongoose.Schema.Types.ObjectId , ref:"feed",required:true
    }
},{
    versionKey:false,
    timestamps:true
})
// comment model => comments collection
module.exports= mongoose.model("comment",commentSchema);