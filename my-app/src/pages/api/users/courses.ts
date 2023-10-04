// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/config/connectMongoDB';
import Course from "../../../models/courseModel"
import { User } from '@/models/userModel';



type Data = {
  result?:{
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  } 
  message?:string
  error?:string
}

type TCourse = {
  _id:String
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
}

type user = {
  username: string,
  password: string,
  purchasedCourses:TCourse[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {method} = req;
  await dbConnect();
  
switch (method) {
  case "GET":
    try {
      const result= await Course.find();
      res.status(200).json({ result })
    } catch (err) {
      res.status(400).send({ error: 'failed to fetch data' })
    }
    break;

  case "POST": 
    try {
      const course = await Course.findById(req.body.courseId);
     
      
      if(course) {
        const user:user = await User.findOne({username : req.body.user.username})
        
        if(user){
          user.purchasedCourses.push(course)
          await user.save();
        
          return res.json({ message: 'Course purchased successfully' });
        } else {
          return res.status(403).json({ error: 'User not found' });
        } 
      } else {
        return res.status(404).json({ error: 'Course not found' });
      }
      }   catch (err) {
      res.status(400).send({ error: 'failed to fetch data' })
    }
    
       break;
  }

  
}
