import React from "react"
import QRCode from "react-qr-code"


interface Props {
    isVisible:boolean,
    closeModal: ()=>void,
    linkUrl: string,
}

export const ModalQr: React.FC<Props> = ({isVisible,closeModal, linkUrl}) => {
  

  if (!isVisible) {
    return null
  }
  
  return (
    <div className="fixed h-screen w-full bg-black bg-opacity-60 top-0 right-0 flex justify-center items-center">
      <div className="bg-neutral-900 h-fit py-5 w-[90%] w-fit flex justify-center items-center rounded-lg border border-solid border-neutral-700">
        
        <div className="flex flex-col gap-4 mx-5">
          <div className="bg-white rounded-lg p-4">
            <QRCode value={linkUrl}></QRCode>
          </div>
          
          <button onClick={closeModal} className="rounded-md h-8 bg-neutral-800 text-neutral-100 min-w-20 hover:bg-neutral-600">Cerrar</button>
        </div>
        
      </div>
    </div>
  )
}
