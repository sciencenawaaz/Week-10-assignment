import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const hell = () => {
    return alert("Hello successfully submitted");
    
  }
  return (
    <main
      className={`flex min-h-screen border border-blue-10 justify-center items-center ${inter.className}`}
    >
      <form className={'flex flex-col p-5 w-1/4 h-1/3 shadow-lg shadow-amber-500 rounded-lg items-center gap-16 transition ease-in-out duration-1000 hover:shadow-amber-900'}>
          <h1 className={" text-7xl font-sans font-bold text-amber-100 hover:blur-sm "}>SIGN UP</h1>
          <input className={ "text-xl text-black w-auto rounded-md p-2"} type ="email" aria-placeholder='Email' aria-label="email"/>
          <input className={"text-xl text-black w-auto rounded-md p-2"} type ="password" aria-placeholder='Password' aria-label="password"/>
          <button className={" text-xl bg-amber-600 rounded-md p-3 px-6 hover:bg-amber-300"}  onClick={hell}>Submit</button>
      </form>
      
    </main>
  )
}
