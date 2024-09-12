import React from 'react'
import { Outlet } from 'react-router-dom'
import "../../styles/global.scss";
import Navbar from '../../components/dashboard/navbar/Navbar';
import Menu from '../../components/dashboard/menu/Menu';

function Layout() {
  return (
    <div className="main-dash">
    <Navbar />
    <div className="container-dash">
      <div className="menuContainer">
        <Menu />
      </div>
      <div className="contentContainer">
         
          <Outlet />
      </div>
    </div>
    {/* <Footer /> */}
  </div>
  )
}

export default Layout