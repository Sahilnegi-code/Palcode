// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes , Link , Navigate } from 'react-router-dom';
import Login from './Screens/LoginScreen/Login';
import AppScreen from './Screens/App/AppScreen';
import RefreshHandler from './component/RefreshHandler';
function App() {
  const [  isAuthenticated , setIsAuthenticated ] = useState(false);
  const PrivateRoute  = ({element}) =>{
    console.log('ELEMENT' ,element )
    return isAuthenticated ? element : <Navigate to="/login" />

  }
  return (
  
         <Router>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
        <Route path="/"  element={<Login/>} />
          <Route path="/login"  element={<Login/>} />
 
          <Route path="/app"  element={ <PrivateRoute element={<AppScreen/>} /> } />
        </Routes>
      
    </Router>
  
  );
}

export default App;
