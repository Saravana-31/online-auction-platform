import './App.css';
import Home from './components/Home';
import Features from './components/Features';
import Items from './components/Items';
import List from './components/List';
import { BrowserRouter, Routes, Route,Navigate, Link } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import About from './components/About';
import Subscribe from './components/Subscribe';
import Layout from './components/Layout';
import Registration from './components/Registration';
import AddItem from './components/AddItem';
import Messages from './components/Messages';
// import io from 'socket.io-client';

// const socket = io('http://localhost:5000');
const API = process.env.REACT_APP_API_URL;
function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const checkSession=async()=>{
      try{
        const response = await fetch(`/check-session`, {
  method: 'GET',
  credentials: 'include',
});


        const data=await response.json();

        if(data.user){
          setLoggedInUser(data.user);
        }
      }catch(err){
        console.log('error',err)
      }
    };
    checkSession();
  }, []);

  

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route element={<Layout loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}>
              <Route path='/' element={<><Home/><Features /><List/><Subscribe/></>} />
              <Route path='/about' element={<About/>} />
              <Route path='/bid' element={<><Items/><AddItem loggedInUser={loggedInUser}/></>} />
              <Route path='/messages' element={<Messages/>} />
            </Route>
            
            <Route path='/login' element={<Registration loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>} />
            
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
