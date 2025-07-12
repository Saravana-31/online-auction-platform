import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({loggedInUser, setLoggedInUser}){
  return(
    <>
      <Navbar loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default Layout;