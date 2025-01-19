import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import  { Navbar, Footer } from '../components/index.js'

function Layout() {
  const [userDetail, setUserDetail] = useState({
      name:"Dane",
      email:"dne@gmail.com",
      loginStatus:true
  })
  
  return (
    <>
        <Navbar userDetail={userDetail} setUserDetail={setUserDetail}/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
