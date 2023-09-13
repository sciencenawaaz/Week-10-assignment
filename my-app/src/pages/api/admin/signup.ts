import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/config/connectMongoDB';
import { AdminSchema } from "@/models/adminModel";


type admin = {
    username: string,
    password: string
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
                let {username , password }:admin = req.body;
 
                let adminSave = async (admin:admin) => {
                  if(admin)  return res.status(403).json({msg:"Admin already exists"})
                  
                 let user:admin = {username ,  password};
                 let newAdmin = new AdminSchema(user)
                 await newAdmin.save();
                //  const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});
                 res.status(201).json({msg:"Admin created successfully"});
                }
               
                AdminSchema.findOne({username}).then(adminSave);
                
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}