import type { NextApiRequest, NextApiResponse } from "next"; 
import dbConnect from '@/config/connectMongoDB';
import { User } from "@/models/userModel";
import Course from "@/models/courseModel";


type TCourse = {
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
}

type user = {
    username: string,
    password: string,
    purchasedCourses?:TCourse[]
}
type Data = {
    PurchasedCourses?:TCourse[]
    msg?:string
    error?:string
  }

export default async function handler(
    req:NextApiRequest,
    res: NextApiResponse<Data>
) {

    const {method} = req
    await dbConnect();

    switch (method) {
        case "GET":
            try {
                            console.log(`Hi from backend ${req.body.username}`);
                            
                const user:user = await User.findOne({username : req.body.username}).populate({path:'purchasedCourses', model:Course});
                if (user) {      
                    return res.status(200).json({PurchasedCourses : user.purchasedCourses || []})
                }
                return res.status(403).json({msg : "User not found"});
                
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}