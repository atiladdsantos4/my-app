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
import { TableBody,TableHeader } from "../../site/table_head";
import { Router, Route, Switch, Redirect,Link,withRouter,useHistory } from "react-router-dom";

function SdbarIndex(){
    
    //const noPointer = {cursor: 'crosshair',color: 'blue'};
    const Position = {position: 'fixed'};

    const cols = [
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
export default SdbarIndex;