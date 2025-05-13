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
    <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <noscript> -- Navbar Brand -- </noscript>
    <a class="navbar-brand ps-3" href="/">Start Bootstrap (React)</a>
   <noscript> -- Sidebar Toggle --</noscript>
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
   <noscript> -- Navbar Search --</noscript>
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
            <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
        </div>
    </form>
   <noscript> -- Navbar --</noscript>
    <Ulnavbar/>
    </nav>
    </> 
  );
}
export default Navbar;