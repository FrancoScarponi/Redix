import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userType } from "../types/types";
import { UserDropDown } from "./UserDropDown";


export const Navbar = () => {
  const navigate = useNavigate();
  const userImg = useSelector((state:userType) => state.user.img);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-neutral-800 flex h-14 max-h-14 items-center justify-center gap-8 w-full fixed">
      <div className="max-w-[80em] w-full flex">
        <div onClick={handleHome} className="flex gap-2 items-center ml-2 cursor-pointer">
          <img src="/enlace.png" alt="logo img" className="h-10 w-10" />
          <span className="font-bold text-3xl align-middle">REDIX</span>
        </div>
        
        <div className="flex items-center w-full justify-end">
          {userImg ? ( 
            <UserDropDown userImg={userImg}/>
          ) : (
            <button onClick={handleLogin} className="border-solid border rounded-md h-8 w-32 border-neutral-400 font-medium hover:bg-neutral-700 ease-in duration-100">
            Iniciar Sesion
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
