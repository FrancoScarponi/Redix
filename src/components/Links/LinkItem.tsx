
import { useState } from "react"
import { LinkType } from "../../types/types"
import { ModalDelete } from "./ModalDelete"
import { Alerts } from "../Alerts"
import { ModalQr } from "./ModalQr"

interface Props{
  link: LinkType
}

export const LinkItem: React.FC<Props> = ({link}) => {

  const dominio = "redix.netlify.app/"
  const [alert,setAlert] = useState(false)
  
  const handleRedirect = ()=>{
    window.location.href = link.url
  }

  const handleCopy = ()=>{
    setAlert(true)
    setTimeout(()=>{
      setAlert(false)
    },2000)
    navigator.clipboard.writeText(`${dominio + link.shortUrl}`)
  }
  
  const [modalQr,setModalQr] = useState(false)

  const closeModalQr = ()=>{
    setModalQr(false)
  }

  const [modalDelete,setModalDelete] = useState(false)
  

  return (
    <div  className="h-20 w-[90%] sm:w-full max-w-[37em] border border-solid border-neutral-800 rounded-md">
       
      <div className="flex flex-col mt-2 mx-3 justify-center gap-1">
        
        <div className="flex justify-between">
          <span onClick={handleRedirect} className=" cursor-pointer text-neutral-500 font-medium text-[1.1em]">/<span className="">{link.shortUrl}</span></span>
          <div className="flex gap-4 items-center">
            <img onClick={()=>setModalDelete(true)} className="h-4 cursor-pointer hover:opacity-60 " src="borrar.png" alt="" />
            <img onClick={()=>setModalQr(true)} className="h-4 cursor-pointer hover:opacity-60 " src="qr.png" alt="" />
            <img onClick={handleCopy} className="h-4 cursor-pointer hover:opacity-60 " src="copiar.png" alt="" />
          </div>
        </div>

        <span className="text-neutral-500 line-clamp-1">{link.url}</span>
      </div>

      <ModalQr isVisible={modalQr} linkUrl={dominio + link.shortUrl} closeModal={closeModalQr}/>

      <ModalDelete modal={modalDelete} setModal={setModalDelete} link={link}/>
      
      <Alerts text="Se ha copiado la URL" alert={alert}/>
    </div>
  )
}
