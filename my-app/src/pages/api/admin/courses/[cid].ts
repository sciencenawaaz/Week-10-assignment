import type { NextApiRequest, NextApiResponse } from "next"; 
import dbConnect from '@/config/connectMongoDB';
import Course from "@/models/courseModel";


type TCourse = {
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
}

type Data = {
    
    msg?:string,
    error?:string
}

export default async function handler(
    req:NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {method} = req
    await dbConnect();

    switch (method) {
        case "PUT":
            try {
              const { cid } = req.query
              const updatedCourse:TCourse = req.body
              const course = await Course.findByIdAndUpdate(cid , updatedCourse , {new:true});
              if(course) {
                  return res.json({msg:"Course Updated"});
              } else {
                return res.status(404).json({msg:"Course not found"});
              }
                 
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}