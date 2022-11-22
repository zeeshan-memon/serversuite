import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
const Redirect = () => {
  const navigate = useNavigate(); 
useEffect(() => {
   navigate("/contabo")
}, [navigate])

  return (
 <></>
  )
}

export default Redirect