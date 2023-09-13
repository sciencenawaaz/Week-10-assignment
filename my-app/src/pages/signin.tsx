
export default function signin() {
    const hell = () => {
        return alert("Hello successfully submitted");
        
      }
  return (
    <main
    className={`flex min-h-screen justify-center items-center`}
  >
    <form className={'flex flex-col gap-10 py-14 w-3/4 lg:py-28 md:w-1/2 md:h-1/2 shadow-lg shadow-amber-500 rounded-lg items-center lg:gap-16 transition ease-in-out duration-1000 hover:shadow-amber-900'}>
        <h1 className={"  text-3xl lg:text-7xl font-sans font-bold text-amber-100"}>SIGN IN</h1>
        <input className={ "lg:text-xl text-black lg:w-3/4 rounded-md p-2"} type ="email" aria-placeholder='Email' aria-label="email"/>
        <input className={"lg:text-xl text-black lg:w-3/4 rounded-md p-2"} type ="password" aria-placeholder='Password' aria-label="password"/>
        
      
            <button className={"lg:text-xl bg-amber-600 rounded-md p-3 px-8 lg:px-16 hover:bg-amber-300"}  onClick={hell}>Submit</button>
    
    </form>
    
  </main>
  )
}
