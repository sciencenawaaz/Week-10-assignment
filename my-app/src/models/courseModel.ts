const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema ({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  });

export default mongoose.models.Course || mongoose.model("Course" ,  courseSchema);