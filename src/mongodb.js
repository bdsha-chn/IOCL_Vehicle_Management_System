const mongoose=require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/iocl")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})
const LogInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const LogInSchema1=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    vrn:{
        type:String,
        required:true
    },
    vnm:{
        type:String,
        required:true
    },
    Dn:{
        type:String,
        required:true
    },
    pn:{
        type:String,
        required:true
    }
})

const collection=new mongoose.model("admin",LogInSchema)
const collection1=new mongoose.model("driver",LogInSchema1)
module.exports={collection,collection1}