import React, { SetStateAction } from "react"
import {v4 as uuidv4} from 'uuid'

interface props {
  setShorturl: React.Dispatch<SetStateAction<string>>
}

export const RandomLink: React.FC<props> = ({setShorturl}) => {
  
  const generateUid = ()=>{
    return uuidv4().substring(0,5);
  }

  const handleRandom = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setShorturl(generateUid())
  }

  return (
    <button onClick={(e)=>handleRandom(e)} type="button" className="rounded-md h-8 bg-neutral-800 text-neutral-100 px-2 hover:bg-neutral-600">
      Aleatorio
    </button>
  )
}
