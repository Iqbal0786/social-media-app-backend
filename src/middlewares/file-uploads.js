const path=require("path");
const multer= require("multer");


const storage= multer.diskStorage({
    destination:function(req,file,callback){
        callback(null,path.join(__dirname,"../uploads"));
    }
},{
    filename:function(req,file,callback){
        let uniquePrefix= Date.now+Math.random().toString;
        callback(null, uniquePrefix+file.originalname)
    }
});

const filefilter= function(req,file,callback){
     if(file.memetype==="image/jpeg" || file.memetype==="image/png"){
         callback(null,true)
     }
     else{
         callback(null,false)
     }
}

const upload =multer({storage,filefilter,limits:{
    fileSize: 1024*1024*5
}});
// upload single function that return a middle ware function
const uploadSingle=(fileKey)=>{
   return  function(req,res,next){
      const uploadItem= upload.single(fileKey);
      uploadItem(req,res,function(err){
        if (err instanceof multer.MulterError) {
            return res.status(500).send(err.message);
          } else if (err) {
            return res.status(500).send(err.message);
          }

          // if everything is fine
          next();
      })
   }

}

// upload single function that return a middle ware function
const uploadMultiple=(fileKey)=>{
    return  function(req,res,next){
       const uploadItem= upload.any(fileKey);
       uploadItem(req,res,function(err){
         if (err instanceof multer.MulterError) {
             return res.status(500).send(err.message);
           } else if (err) {
             return res.status(500).send(err.message);
           }
 
           // if everything is fine
           next();
       })
    }
 
 }

 module.exports={upload,uploadSingle,uploadMultiple};

