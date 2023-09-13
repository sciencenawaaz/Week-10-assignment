const mongoose = require("mongoose");


const ADMIN = new mongoose.Schema ({
  
    username : {type: String , required: true},
    password : {type: String , required: true}
    
  })
  const userSchema = new mongoose.Schema ({
    
    username : {type: String , required: true},
    password : {type: String , required: true},
    purchasedCourses : [{type : mongoose.Schema.Types.ObjectId , ref : 'Course'}]
    
  })
  
  
  const courseSchema = new mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });
  
  export const AdminSchema = mongoose.model('ADMIN' , ADMIN);
  export const User = mongoose.model('User' , userSchema);
  export const Course = mongoose.model("Course" ,  courseSchema);