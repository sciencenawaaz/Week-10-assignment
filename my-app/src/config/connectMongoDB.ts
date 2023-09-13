const mongoose = require("mongoose");


const DB_URI = process.env.MONGODB_URI;
export default function dbConnect() {
    
   mongoose.connect(DB_URI,{ useNewUrlParser: true, useUnifiedTopology: true, dbName: "next_course" }).then( () => console.log("Mongoose Online")).catch((err:string) => {console.log(err);})
  
}
 