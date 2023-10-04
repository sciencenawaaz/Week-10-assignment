"useClient"

import { useSession } from "next-auth/react"
const axios = require('axios')
import {useState , useEffect} from "react"
let id = 0;

type TCourse = {
   title: String,
   description: String,
   price: Number,
   imageLink: String,
   published: Boolean
}

const courses = () => {
   
   const session = useSession();
   const authUser = session.data?.user?.email
   console.log(JSON.stringify(authUser));
   
   async function getCourses() {
      
      const response = await axios.post("http://localhost:3000/api/users/purchasedCourses",{
         headers: {
            "Content-Type": "application/json",
         },
         "username": authUser,
      }
      );
      console.log(response);
      
      return;
   };
   
   useEffect(() => {
     getCourses()
     return () => {
       
     }
   }, [])


   
  if(session) {    

  return (
    <section className=" flex flex-col justify-center items-center gap-10 p-3">
      {/* <button onClick={getCourses}>Click me</button> */}
        <div className="flex flex-col justify-center items-center shadow-xl shadow-amber-600 w-2/3 p-2 rounded-md hover:shadow-amber-300 lg:w-1/3">
         <img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"/>
         <h2 className=" text-center">
            title
         </h2>
         <p >
            descrripton
         </p>
       </div>
       
       <div className="flex flex-col justify-center items-center shadow-xl shadow-amber-600 w-2/3 p-2 rounded-md hover:shadow-amber-300 lg:w-1/3">
         <img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"/>
         <h2 className=" text-center">
            title
         </h2>
         <p >
            descrripton
         </p>
       </div>
       <div className="flex flex-col justify-center items-center shadow-xl shadow-amber-600 w-2/3 p-2 rounded-md hover:shadow-amber-300 lg:w-1/3">
         <img src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg"/>
         <h2 className=" text-center">
            title
         </h2>
         <p >
            descrripton
         </p>
       </div>

    </section>
       
  )
  }
  {
   return <p>Loading....</p>
  }
}

export default courses