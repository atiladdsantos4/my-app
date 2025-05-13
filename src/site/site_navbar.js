/*
   <nav>
     |--><Ulnavbar/> 
   </nav>
*/
import React, {useState, useEffect } from "react";
import Ulnavbar from "./ulnavbar";
function Navbar(){
    return(
    <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <noscript> -- Navbar Brand -- </noscript>
    <a className="navbar-brand ps-3" href="/">Start Bootstrap (React)</a>
   <noscript> -- Sidebar Toggle --</noscript>
    <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars"></i></button>
   <noscript> -- Navbar Search --</noscript>
    <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div className="input-group">
            <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search"></i></button>
        </div>
    </form>
   <noscript> -- Navbar --</noscript>
    <Ulnavbar/>
    </nav>
    </> 
  );
}
export default Navbar;