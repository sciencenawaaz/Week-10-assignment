import type { NextApiRequest, NextApiResponse } from "next"; 
import dbConnect from '@/config/connectMongoDB';
import Course from "@/models/courseModel";
import { User } from "@/models/userModel";


type user = {
    username: string,
    password: string
}

type Data = {
    
    message?:string,
    error?:string
}

export default async function handler(
    req:NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {method} = req
    await dbConnect();

    switch (method) {
        case "POST":
            try {
              const { cid } = req.query
              const {username , password}:user = req.body
              const course = await Course.findById(cid);
              if(course) {
                const user = await User.findOne({username , password})
                if(user){
                  user.purchasedCourses.push(course)
                  await user.save();
                  return res.json({ message: 'Course purchased successfully' });
                } else {
                  return res.status(403).json({ message: 'User not found' });
                } 
              } else {
                return res.status(404).json({ message: 'Course not found' });
              }
                 
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}