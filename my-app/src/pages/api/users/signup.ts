import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '@/config/connectMongoDB';
import { User } from "../../../models/userModel";


type user = {
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
                    let {username , password }:user = req.body;
 
                    let userSave = async (admin:user) => {
                    if(admin)  return res.status(403).json({msg:"User already exists"})
   
                        let user = {username ,  password};
                        let newUser = new User(user)
                        await newUser.save();
                        // const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});
                       return  res.status(201).json({msg:"User created successfully"});
                }
  
               User.findOne({username}).then(userSave);
                
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}