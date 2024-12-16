import React, { useEffect } from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'

const RefreshHandler = ({setIsAuthenticated}) => {
const navigate = useNavigate();
const location = useLocation();
console.log('Refresh')
useEffect(()=>{
    const data = localStorage.getItem('user-info');
    console.log(data);
    const token = JSON.parse(data)?.token;
    console.log(token);
    if( token ){
        setIsAuthenticated(true);
        if(location.pathname  === '/login' || location.pathname  === '/'){
            navigate('/app');
        }
    }

},[setIsAuthenticated,location]);
  return (
    <div></div>
  )
}

export default RefreshHandler