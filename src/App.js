import './App.css';
import logo from './customLogo.png'
import React, {useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"))
  return (
    <Router>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
            <img src={logo} style={{height:"40px", width:"40px"}}/>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              {!isAuth ? (
                  <>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <button type="submit" class="btn btn-outline-success me-2">Login</button>
                    <button type="submit" class="btn btn-outline-success me-2">Register</button>
                  </>
                ) : (
                  <>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                      <li class="nav-item">
                        <a class="nav-link" href="">Hidden Links</a>
                      </li>
                    </ul>
                    <div class="me-3">
                      Username  
                    </div>
                    <button type="submit" class="btn btn-outline-danger me-2">Logout</button>
                  </>
                )}
            </div>
        </div>
      </nav>
      <Routes>

      </Routes>
    </Router>
  );
}

export default App;
