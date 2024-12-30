import { LinkItem } from "./LinkItem"
import { linkReduxType } from "../../types/types"
import { useSelector } from "react-redux"



export const LinkList = () => {
  const links = useSelector((state:linkReduxType)=>state.link.links)
  if (links) {
    return(
      <div className="flex flex-col items-center gap-3 w-full ">
        {links.map((link,index)=>(
          <LinkItem key={index} link={link} />
        ))}
      </div>
    )
  }

  return (
    
    <p className="text-neutral-500">Aun no hay Links</p>
  )
}
