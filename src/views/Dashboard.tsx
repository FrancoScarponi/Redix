import { useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import { ModalCreate } from "../components/Links/ModalCreate"
import {LinkList} from "../components/Links/LinkList";
import { useDispatch} from "react-redux";
import {setLinks} from "../redux/linkSlice"
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/credentials";
import {LinkType} from "../types/types"
import { updateLinks } from "../services/fireBaseServices";

export const Dashboard = () => {
  
  const [modal,setModal] = useState(false)

  const dispatch = useDispatch()

  const closeModal = ()=>{
    setModal(false)
  }
  
  useEffect(()=>{
    const fetchLinks = async()=>{
      try{
        const linksData = await updateLinks()
        dispatch(setLinks(linksData))
      }catch(error){
        console.log("Error en fetch: ", error)
      }
    }
    fetchLinks();
  },[])

  return (
    <div className="bg-neutral-900 flex flex-col h-screen items-center">
      
      <Navbar/>
      
      <section className="mt-20 flex flex-col w-full h-screen   max-w-[80em] justify-center items-center">
        
        <div className="flex w-[90%] sm:w-full justify-end  items-end mt-2">
          <div onClick={()=>setModal(true)} className="bg-neutral-800 h-10 px-4 rounded-md flex items-center justify-center gap-2 cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4" viewBox="0 0 448 512" fill="currentColor">
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
            </svg>
            <span className="text-md font-medium h-fit">Crear Link</span>
          </div>
        </div>
                
        <div className="flex h-full w-full mt-6  flex-col items-center">
          <LinkList/>
        </div>

        <ModalCreate showModal={modal} closeModal={closeModal} />
        
      </section>
      
    </div>
  )
}
