/*
  <div id="layoutSidenav">
    |--><Sidebarmenu /> 
*/
import React, {useState} from "react";
import Sidebarmenu from "./sidebarmeu";
import Card from "./card";
import Grafico from "./grafico"; 
import Table from "./Table";
import TableCustom from "./TableCustom";
import Footer from "./footer";
import Main from './main'

function Navsidebar(){
    
    //const noPointer = {cursor: 'crosshair',color: 'blue'};
    const Position = {position: 'fixed'};

    const colunas = [
        "name",
		"position",
		"office",
		"age",
		"start_date",
		"salary"
    ];
    
    return(
    <>
    <div id="layoutSidenav">
            <noscript> -- Sidebar Menu --</noscript>
            <Sidebarmenu />
            <div id="layoutSidenav_content">
                <Main/>
                <Footer site="JemoSistemas"/>
            </div>
    </div>
        
    </> 
  );
}
export default Navsidebar;