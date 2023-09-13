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
        case "POST":
            try {
                
                const newCourse:TCourse = req.body
                const course = new Course(newCourse);
                await course.save();
               
                return res.status(201).json({msg:"Course created successfully"})

            
                
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}
