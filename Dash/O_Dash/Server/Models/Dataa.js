const mongoose=require("mongoose");

const dataa=new mongoose.Schema({
    companyname:String,
    description:String,
    dateTime:  Date, 
    location: String,
    mode:  String,
    ticketType: String, 
    capacity:  Number,
    image:  String
    
});

module.exports=mongoose.model("dataa",dataa); 