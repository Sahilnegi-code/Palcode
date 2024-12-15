import React from 'react'
import { useNavigate } from 'react-router-dom';

const AppScreen = () => {
    const navigate = useNavigate();
    
    const handleLogOut = () =>{

        localStorage.removeItem('user-info');
        navigate('/login')

    }

  return (
    <div>AppScreen



        <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default AppScreen