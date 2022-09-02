const express= require("express");
const connect= require("./configs/db")
const cors= require("cors")
const app= express();
app.use(cors())
app.use(express.json());

app.listen(7777,async()=>{
    try {
        await connect();
        console.log("Listening the port number 7777");
    } catch (error) {
        
    }
})