import { useNavigate } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { auth } from "../firebase/credentials"

export const Home = () => {
  
  const navigate = useNavigate()
  
  const handleLogin = ()=>{
    if (auth.currentUser) {
      navigate('/dashboard')
      return
    }
    navigate('/login')  
  }

  return (
    <div className="bg-neutral-900">
        
        <Navbar/>
        <div className="h-screen flex flex-col justify-center items-center ">
            
          <div className="flex flex-col max-w-[55em] w-[90vw] sm:w-full ">
              
            <h1 className="text-8xl font-bold align-bottom text-start">REDIX</h1>
              
            <div className="ml-1 mt-2 flex flex-col">
              <span className="font-bold">Acorta, gestiona y genera QR para tus URLs fácilmente.</span> 
              <span>Optimiza tus enlaces, haz un seguimiento
              y crea códigos QR personalizados para compartir de forma rápida y sencilla.</span>
            </div>

            <button onClick={handleLogin} className="border-solid border border-neutral-300 rounded-md font-medium  text-lg align-middle h-12 w-32 mt-5 hover:bg-neutral-700 ease-in duration-100 ">Iniciar</button>
              
          </div>

        </div>
      
    </div>
  )
}
