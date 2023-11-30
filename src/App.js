import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import TodoApp from './pages/Todoapp';
import Home from './pages/Home';
import './App.css';
  //import About from './pages/about';
  





function App() {
  
  
  return (

    <div className="App">
      <Router>
      
          <div className="navbar">
   
<NavLink exact activeClassName="active" to="/">
  Login
</NavLink> 
*/
  <NavLink activeClassName="active" to="/Todoapp">
              App
 </NavLink>
          </div>
      
        <Routes>
          {/* 
<Route path="/" element={<Home />} /> 
*/}
          <Route path="/" element={<Home />} />
          <Route path="/todoapp" element={<TodoApp />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;