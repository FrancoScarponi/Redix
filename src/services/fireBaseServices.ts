import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { auth, db } from "../firebase/credentials"
import { LinkType } from "../types/types";
import { getAuth } from "firebase/auth";



export const addLink = async (data:LinkType)=>{
    const q = await query(collection(db,"links"), where("shortUrl","==",data.shortUrl));
    const querySnapshots = await getDocs(q)

    if (!querySnapshots.empty) {
        throw new Error('El valor ingresado ya esta en uso.')
    }

    await addDoc(collection(db,"links"),data)
}


export const updateLinks = async ()=>{
    try{
      const userUid = await getAuth().currentUser?.uid;
      const q = await query(collection(db,"links"), where("userUid", "==", userUid))
      const querySnapshot = await getDocs(q)
      const linksData: LinkType[] = querySnapshot.docs.map(doc=>doc.data() as LinkType);
      return linksData
    }catch(error){
      console.log("Error en fetch: ", error)
    } 
}
