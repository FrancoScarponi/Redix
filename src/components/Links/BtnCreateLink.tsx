import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userType } from "../../types/types";
import { setLinks } from "../../redux/linkSlice";
import { addLink, updateLinks } from "../../services/fireBaseServices";


interface Props{
  url: string,
  shortUrl:string,
  closeModal:()=>void,
}

export const BtnCreateLink: React.FC<Props> = ({url,shortUrl, closeModal}) => {

  const userUid = useSelector((state:userType)=>state.user.uid)

  const [loading,setLoading] = useState(false)
  
  const dispatch = useDispatch()

  const handleCreate = async (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setLoading(true)
    
    if (url=="" || shortUrl=="") {
      setLoading(false)
    return
    }
    
    const data = {
      url:url,
      shortUrl:shortUrl,
      userUid:userUid
    }
    try{
      await addLink(data);
      const linksData = await updateLinks();
      dispatch(setLinks(linksData))
      closeModal()
      console.log("se agrego correctamente el link")
    }catch{
      
    }
  }

  return (
    <button onClick={(e)=>handleCreate(e)} className="rounded-md h-8 bg-neutral-800 text-neutral-100 min-w-20 hover:bg-neutral-600">
      {
        loading ? 
          <div className="flex justify-center">
            <div className="loader"></div>
          </div> 
        : "Crear"
      }
    </button>
  )
}
