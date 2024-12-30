import { collection, getDocs, query, where } from "firebase/firestore"
import { useParams } from "react-router-dom"
import { db } from "../firebase/credentials"
import { useEffect} from "react"

export const RedirectLink = () => {
  
  const {shortUrl} = useParams()
  
  useEffect(()=>{
    const redirect = async () => {
      try{
        const querySnapshot = await getDocs(query(collection(db, "links"), where("shortUrl", "==", shortUrl)));
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data);
            window.location.href = data.url
          });
        }
      }catch(error){
        console.log("el error es: ", error)
      }
    
    }
    redirect();
  },[shortUrl])

  return (
    <div className="h-screen w-full bg-neutral-900 flex justify-center items-center">
      <div className="loader" style={{ width: "50px", borderWidth: "5px" }}></div>
    </div>
  )
}
