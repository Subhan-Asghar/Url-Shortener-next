
import mongoose from "mongoose";
const UrlSchema=new mongoose.Schema({
   shortId:{
    type:String,
    required:true,
    unique:true
   },
   redirectURL:{
    type:String,
    required:true
   },
   visitHistory:[{timeStamp:{type:Number}}],
},{timestamps:true})

const Url=mongoose.models.Url || mongoose.model("Url",UrlSchema)
module.exports=Url