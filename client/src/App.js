import './App.css';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Test from './components/Test';
import Dashboard from './components/Dashboard';
import React, { useEffect, useState } from 'react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("uid");
    if (token) {
      setIsAuthenticated(false);
      
    }
    else{
      setIsAuthenticated(true);
    }
  }, []); 
  
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home setLogin={setIsAuthenticated} />} />
          <Route path="/about" element={<Test />} />
          <Route
            path="/dashboard"
            element={ !isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
