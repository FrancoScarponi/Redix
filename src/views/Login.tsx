import { Navbar } from "../components/Navbar";
import { GoogleLogin } from "../components/GoogleLogin";

export const Login = () => {
  
  return (
    <div className="bg-neutral-900">
      <Navbar />
      <div className="h-screen flex justify-center">
        <div className="flex flex-col justify-evenly items-center mt-40 border border-solid h-fit min-h-72 w-[25em] rounded-lg border-neutral-700">
          <div>
            <img src="enlace.png" alt="" className="h-16" />
          </div>

          <p className="text-neutral-400">Inicia sesión con tu proveedor favorito:</p>

          <div className="w-full flex flex-col gap-3 justify-center items-center">
            
            <GoogleLogin/>

            <button className="w-[90%] h-10 border border-solid border-neutral-700 rounded-md flex items-center justify-center gap-3 hover:bg-neutral-700 ease-in duration-100 ">
              <img src="github.png" alt="" className="h-5" />
              Continuar con GitHub
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
