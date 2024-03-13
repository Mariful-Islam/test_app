import './App.css';
import '../src/scss/style.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login"
import React from "react";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Update from './pages/Update';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route Component={Contact} path='/'/>
            <Route Component={Update} path='update/:id/'/>
            <Route Component={Profile} path='/profile/:username'/>
            <Route Component={SignUp} path='/signup'/>
            <Route Component={Login} path='/login'/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
