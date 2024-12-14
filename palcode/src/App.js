// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes , Link } from 'react-router-dom';
import Login from './Screens/LoginScreen/Login';

function App() {
  return (
  
         <Router>
    
        <Routes>
          <Route path="/"  element={<Login/>} />
          {/* <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} /> */}
        </Routes>
      
    </Router>
  
  );
}

export default App;
