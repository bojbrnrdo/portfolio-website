// Copyright (c) 2026 Job Bernardo. All rights reserved. See LICENSE for applicable third-party notices.
import { useEffect, useState } from "react";
import ChessGame from "../pages/ChessGame";
import { config } from "../config";
import "./styles/CallToAction.css";

const CallToAction = () => {
  const [open,setOpen] = useState(false);
  useEffect(()=>{
    if(!open)return;
    const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setOpen(false);};
    document.addEventListener("keydown",close);
    return()=>document.removeEventListener("keydown",close);
  },[open]);
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <button type="button" onClick={() => setOpen(true)} className="cta-btn cta-btn-play" data-cursor="disable">
          Play With Me →
        </button>
        
        <a 
          href={config.contact.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="cta-btn cta-btn-hire"
          data-cursor="disable"
        >
          Hire Me →
        </a>
      </div>
      {open && <div className="chess-modal-overlay" role="dialog" aria-modal="true" aria-label="Play chess" onClick={() => setOpen(false)}>
        <div className="chess-modal-content" onClick={e=>e.stopPropagation()}>
          <button className="chess-modal-close" type="button" aria-label="Close chess game" onClick={() => setOpen(false)}>×</button>
          <ChessGame embedded />
        </div>
      </div>}
    </div>
  );
};

export default CallToAction;
