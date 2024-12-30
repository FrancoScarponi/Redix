import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../firebase/credentials';
import { userLogin } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const GoogleLogin = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const provider = new GoogleAuthProvider();
  
  const handleLoginGoogle = async ()=>{
      try{
        const result = await signInWithPopup(auth,provider)
        
        console.log(result.user.toJSON())
        
        const userdata = {
          name:result.user.displayName,
          email:result.user.email,
          img:result.user.photoURL,
          uid:result.user.uid
        }
        
        dispatch(userLogin(userdata))

        navigate('/dashboard')
      }catch(error){
        console.log("mensaje de error: "+ error)    
      }
    }
  
  return (
    <button onClick={handleLoginGoogle} className="w-[90%] h-10 border border-solid border-neutral-700 rounded-md flex items-center justify-center gap-3 hover:bg-neutral-700 ease-in duration-100 ">
      <img src="google.png" alt="" className="h-5" />
      Continuar con Google
    </button>
  )
}
