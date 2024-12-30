import { useState } from "react"
import { useDispatch } from "react-redux";
import {userLogout} from '../redux/userSlice'
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/credentials";


interface Props{
    userImg:string
}

export const UserDropDown: React.FC<Props> = ({userImg}) => {
  
    const [modal,setModal] = useState(false);
    
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = ()=>{  
      auth.signOut().then(()=>{
        dispatch(userLogout())
        navigate('/')
      }).catch((error)=>{
        console.log(error)
      })
    } 

    return (
    <div className="relative">
      
      <img src={userImg} onClick={()=>setModal(!modal)} alt="userImg" className="h-10 w-10 rounded-full cursor-pointer" /> 
      
      {modal?(
        <div className="flex items-center bg-neutral-700 w-fit min-w-36 min-h-10 absolute mt-2 rounded-sm right-0 dropdown-enter">
          <ul className="flex flex-col justify-start items-start ml-3 ">
            <li onClick={handleLogout} className="cursor-pointer">Cerrar sesion.</li>
          </ul>
        </div>
      ):null}
        
    </div>
  )
}
