// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/config/connectMongoDB';
import { Course } from "../../../models/Models"

type Data = {
  result?:{
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean
  }
  error?:string
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
}
  
}
