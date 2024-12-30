import { useEffect, useState } from "react";
import { RandomLink } from "../RandomLink";
import { userType } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { addLink, updateLinks } from "../../services/firebaseServices";
import { setLinks } from "../../redux/linkSlice";

interface Props {
  showModal: boolean;
  closeModal: () => void;
}

export const ModalCreate: React.FC<Props> = ({ showModal, closeModal }) => {
  
  const [url,setUrl] = useState("");
  const [shortUrl, setShorturl] = useState("");
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()
  const userUid = useSelector((state:userType)=>state.user.uid)
  const [error,setError] = useState(false)

  const handleCancel = (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault()
    setUrl("");
    setShorturl("");
    closeModal();
  }

  const handleCreate = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); // Detiene el envío predeterminado del formulario
    console.log("Submit triggered via Enter"); // Debug para verificar
    setLoading(true);

    if (url === "" || shortUrl === "") {
      setLoading(false);
      return;
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
      setLoading(false)
      closeModal()
      console.log("se agrego correctamente el link")
    }catch{
      setError(true)
      setLoading(false)
    }
  }

  useEffect(()=>{
    setError(false);
    setShorturl("");
    setUrl("")
  },[showModal])

  if (!showModal) {
    return null;
  }

  return (
    <div className="fixed h-screen w-full bg-black bg-opacity-60 top-0 right-0 flex justify-center items-center">
      <div className="bg-neutral-900 h-fit py-5 w-[90%] sm:w-full max-w-[30em] flex justify-center items-center rounded-lg border border-solid border-neutral-700">
        <form onSubmit={(e) => handleCreate(e)} className="flex flex-col gap-4 w-[90%] opacity-100">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold">Crear Link</h2>
            <div
              onClick={closeModal}
              className="cursor-pointer text-xl font-light pl-4 pb-2"
            >
              x
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Url</label>
            <input
              value={url}
              onChange={(e)=>setUrl(e.target.value)}
              className="px-2 rounded-md h-8 bg-neutral-900 border border-solid border-neutral-700"
              type="text"
              name=""
              id=""
            />
          </div>
          <div>
            <div className="flex gap-2 items-end">
              <div className="w-full">
                <label htmlFor="">Mi link</label>
                <input
                  value={shortUrl}
                  onChange={(e)=>setShorturl(e.target.value)}
                  className="px-2 w-full rounded-md h-8 bg-neutral-900 border border-solid border-neutral-700"
                  type="text"
                  name=""
                  id=""
                />
              </div>
              <RandomLink setShorturl={setShorturl}/>
            </div>
            {error?<p className="text-red-400 opacity-70 leading-5 italic mt-2">El nombre ingresado ya esta en uso.</p>:null}
          </div>

          <div className="flex justify-end gap-2 ">
            <button type="button" onClick={(e)=>handleCancel(e)} className="rounded-md h-8 border border-solid border-neutral-800 text-neutral-100 px-2 hover:bg-neutral-800">
              Cancelar
            </button>

            <button type="submit" className="rounded-md h-8 bg-neutral-800 text-neutral-100 min-w-20 hover:bg-neutral-600">
              {
                loading ? 
                  <div className="flex justify-center">
                    <div className="loader"></div>
                  </div> 
                : "Crear"
              }
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
