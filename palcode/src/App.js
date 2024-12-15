// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes , Link , Navigate } from 'react-router-dom';
import Login from './Screens/LoginScreen/Login';
import AppScreen from './Screens/App/AppScreen';

function App() {
  const [  isAuthenticated , setIsAuthenticated ] = useState(false);
  const privateRoute  = ({element}) =>{
    return isAuthenticated ? element : <Navigate to="/login" />

  }
  return (
  
         <Router>
    
        <Routes>
          <Route path="login"  element={<Login/>} />
          <Route path="signup"  element={<Login/>} />
          <Route path="app"  element={ <privateRoute element={<AppScreen/>} /> } />
          {/* <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} /> */}
        </Routes>
      
    </Router>
  
  );
}

export default App;
