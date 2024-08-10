
const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const userSchema=new Schema({
    Name:String ,   
    age:Number,
    favoriteFoods: [String],  // Array of strings
   

})


const User=mongoose.model('users', userSchema)
module.exports=User
 


