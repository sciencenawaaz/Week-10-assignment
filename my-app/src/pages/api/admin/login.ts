import type { NextApiRequest, NextApiResponse } from "next"; 
import dbConnect from '@/config/connectMongoDB';
import { AdminSchema } from "@/models/adminModel";

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

                let username  = req.body.username;
                let password  = req.body.password;
                const user:user = await AdminSchema.findOne({username ,  password});
              
                if( user ){
              
                //   const token = jwt.sign({username} , process.env.SECRET , {expiresIn : '1h'});
              
                  return res.status(200).json({msg:"Admin LoggedIn"})
                }
                 return res.status(403).json({msg:"Wrong Credentials"}) ;
                
            } catch (error) {
                return res.status(400).send({ error: 'failed to fetch data' })
            }
            
            break;
    
    }
    
}
