const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    
    username : {type: String , required: true},
    password : {type: String , required: true},
    purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
    
  })

  export const User = mongoose.models.User || mongoose.model('User' , userSchema);