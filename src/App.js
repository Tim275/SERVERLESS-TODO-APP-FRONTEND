import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import TodoApp from './pages/Todoapp';
import Home from './pages/Home';
import './App.css';
  //import About from './pages/about';





function App() {
  
  
  return (

    <div className="App">
      <Router>
      
          <div className="navbar">
   {/* 
<NavLink exact activeClassName="active" to="/">
  Login
</NavLink> 
*/}
            <NavLink activeClassName="active" to="/Todoapp">
              App
            </NavLink>
          </div>
      
        <Routes>
          {/* 
<Route path="/" element={<Home />} /> 
*/}
          <Route path="/" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;