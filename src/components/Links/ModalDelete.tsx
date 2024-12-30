import React, { useState } from "react"
import { LinkType } from "../../types/types"
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/credentials"
import { useDispatch } from "react-redux"
import { setLinks } from "../../redux/linkSlice"
import { Alerts } from "../Alerts"
import { updateLinks } from "../../services/fireBaseServices"


interface Props{
  modal: boolean,
  setModal: (isOpen:boolean)=>void,
  link: LinkType
}

export const ModalDelete:React.FC<Props> = ({modal, setModal,link}) => {
  const [txtLink,setTxtLink] = useState("")
  
  const [showAlert, setShowAlert] = useState<boolean>(false)
  
  const dispatch = useDispatch()  
  
  const refreshLinks = async ()=>{
    try{
      const linksData= await updateLinks(); 
      dispatch(setLinks(linksData))
    }catch(error){
      console.log("Error en fetch: ", error)
    } 
  }

  const handleModal = (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    setModal(false)
  }

  const deleteLink = async ()=>{
    try{
      const querySnapshot = await getDocs(query(collection(db,"links"), where("shortUrl","==",link.shortUrl)));
      querySnapshot.forEach(async (docSnap)=>{
        const docRef = doc(db,"links",docSnap.id);
        await deleteDoc(docRef)
      })
      refreshLinks()
      setModal(false)
      setTxtLink("")
    }catch(error){
      console.log(error)
    }
    
  }

  const handleDelete =  (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if (txtLink != link.shortUrl) {
      setShowAlert(true)
      setTimeout(()=>{
        setShowAlert(false);
      },2000)
      return
    }
    deleteLink();
  }

  if (modal) {
    return(
      <div className="fixed h-screen w-full bg-black bg-opacity-60 top-0 right-0 flex justify-center items-center">
        <div className="bg-neutral-900 h-fit py-5 px-5 w-[90%] sm:w-full max-w-[30em] flex flex-col items-start rounded-lg border border-solid border-neutral-700">
            <h3 className="mb-1 text-xl font-semibold text-neutral-400">Delete /{link.shortUrl}</h3>
            <p className="mb-3 text-red-400 opacity-70 leading-5 italic" >El acceso al enlace se eliminará de forma permanente. Esta acción no se puede deshacer.</p>
            <form action="" onSubmit={(e)=>handleDelete(e)} className="flex flex-col w-full ">
              <label htmlFor="" className="mb-1 font-semibold text-neutral-400">Escribe "<span className="text-neutral-200">{link.shortUrl}</span>" para eliminarlo</label>
              <input value={txtLink} onChange={e=>setTxtLink(e.target.value)} type="text" className="px-2 rounded-md h-8 bg-neutral-900 border border-solid border-neutral-700 mb-4" />
              <div className="w-full flex justify-end gap-3">
                <button  onClick={(e)=>handleModal(e)} type="button" className="text-neutral-400 rounded-md h-8 border border-solid border-neutral-800 text-neutral-100 px-2 hover:bg-neutral-800">Cancel</button>
                <button type="submit" className="font-semibold rounded-md h-8 bg-red-900 text-neutral-100 min-w-20 hover:bg-red-800">Delete</button>
              </div>
            </form>
        </div>

        <Alerts text="¡El Texto ingresado no coincide!" alert={showAlert} />
      </div>
    )
  }
}
