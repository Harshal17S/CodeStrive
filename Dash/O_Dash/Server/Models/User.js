const mongoose=require("mongoose");

const usersSchema=new mongoose.Schema({
    companyname:String,
    description:String,
    dateTime:  Date, 
    location: String,
    mode:  String,
    ticketType: String, 
    capacity:  Number,
    image:  String
    
});

module.exports=mongoose.model("users",usersSchema); 