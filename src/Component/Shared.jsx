import React from 'react'
import Dashboard from './Dash'
import {Outlet} from 'react-router-dom'
import Footer from './Footer'


function Shared() {
  return (
    <div>
      <Dashboard/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Shared