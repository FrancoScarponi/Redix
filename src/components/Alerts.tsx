import React, { useState, useEffect } from "react";

interface Props {
  text: string;
  alert: boolean;
}

export const Alerts: React.FC<Props> = ({ text, alert }) => {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alert) {
      setIsVisible(true); 
      setTimeout(() => setIsAnimating(true), 10); 
    } else {
      setIsAnimating(false); 
      const timer = setTimeout(() => setIsVisible(false), 1000); 
      return () => clearTimeout(timer);
    }
  }, [alert]);

  if (!isVisible) return null; 

  return (
    <div
      className={`absolute bottom-5 sm:right-5 w-[90%] sm:w-96 border border-neutral-800 rounded-lg bg-neutral-900 transition duration-500 ease-out
      ${isAnimating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div className="flex gap-3 h-12 items-center justify-start ml-3">
        <img src="advertencia.png" className="h-5" alt="advertencia" />
        <p>{text}</p>
      </div>
    </div>
  );
};
