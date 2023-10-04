"useClient"

import { useSession } from "next-auth/react"
const axios = require('axios')
import {useState , useEffect, useRef} from "react"

type TCourse = {
   _id:string,
   title: string,
   description: String,
   price?: string,
   imageLink: String,
   published?: Boolean
}

const courses = () => {
   
   const session = useSession();
   const authUser = session.data?.user?.email //getting user session details
   // console.log(JSON.stringify(authUser));

   const [Courses, setCourses] = useState<TCourse[]>()
   const [Loading, setLoading] = useState(true)
   const ref = useRef(null)
   async function getCourses() {
      
      const response = await axios.get("http://localhost:3000/api/users/courses",{
         headers: {
            "Content-Type": "application/json",
         },
         "username": authUser,
      }
      );
      
      let courses = response.data.result;

      setCourses(courses) 
      setLoading(false)
      return;
   };

   const buyCourse = async () => {
      console.log(ref.current.id);
      
            const response = await axios.post("http://localhost:3000/api/users/courses",{
               headers: {
                  "Content-Type": "application/json",
               },
               "username": authUser,
               "courseId": "64ca3e8521d3d69fb9815ed1",
               "user": {
                     "username":authUser
               }
            });
   }
   
   useEffect(() => {
     getCourses()
     return () => {
       
     }
   }, [])

   
  if(Loading === false) {    

  return (Courses?.map((course,_id)=> {
return (
<section ref={ref} id={course._id} key={course._id}  className=" flex flex-col justify-center items-center gap-10 p-3">
           <div className="flex flex-col justify-center items-center shadow-xl shadow-amber-600 w-2/3 p-2 rounded-md hover:shadow-amber-300 lg:w-1/3">
            <img src = {course.imageLink} alt="course image"/>
            <h2 className=" text-center">
             {course.title} 
            </h2>
            <p >
             {course.description} 
            </p>
            <span className= "py-4 text-center text-xl">Price : ₹{course.price}</span>
         <button className="px-4 py-2 border border-slate-200 rounded-md" onClick={buyCourse}>Click me</button>
          </div>
       </section>
)

  })
  )
         
   }
   
  {
   return <p>Loading....</p>
  }
}

export default courses