import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import  { Navbar, Footer } from '../components/index.js'
import Cookies from "js-cookie"

function Layout() {

  return (
    <>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </>
  )
}

export default Layout
