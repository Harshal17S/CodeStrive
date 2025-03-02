const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    useremail:{
        type:String
    },
    eventsHosted:{
        type:String
    }
   
})

const User=mongoose.model('Organizer',userSchema);
module.exports=User;