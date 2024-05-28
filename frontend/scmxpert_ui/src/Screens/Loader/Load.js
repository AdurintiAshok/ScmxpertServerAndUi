import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Load.css'
function Load() {
    const navigate=useNavigate();
    const [state,setState]=React.useState(false);
    React.useEffect(()=>
    {
  
      const timer=setTimeout(()=>
      {
        navigate('/login')
      },2800)
    },[])
  return (
<div id="loadingOverlay" class="loading-overlay">
<div className="loader">
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
  </div>
  </div>
  )
}

export default Load