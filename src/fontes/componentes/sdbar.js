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

function Sdbar(){
    
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
                <main>
                {/* <Main/> */}
                <div class="card mb-4">
                   <table id="datatablesSimple"> 
                    <TableHeader colunas={cols}/>
                    <TableBody/> 
                   </table> 
                   {/* <TableCustom id="datatablesSimple" title="DataTable Custom Example" colunas={colunas}/> */}
                </div>
                </main>
                {/* <main>
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Dashboard</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div class="row">
                            <div class="col-xl-3 col-md-6">
                                <Card classe="card bg-primary text-white mb-4" texto_link="View Details" texto="Primary Card"/>                     
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <Card classe="card bg-warning text-white mb-4" texto_link="View Details" texto="Warning Card"/>                     
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <Card classe="card bg-success text-white mb-4" texto_link="View Details" texto="Success Card"/>                     
                            </div>
                            <div class="col-xl-3 col-md-6">
                                <Card classe="card bg-danger text-white mb-4" texto_link="View Details" texto="Danger Card"/>                     
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-area me-1"></i>
                                        Area Chart Example
                                    </div>
                                    <div class="card-body">
                                        <Grafico id="myAreaChart" tipo="area" wd="100%" hg="40%"></Grafico>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-bar me-1"></i>
                                        Bar Chart Example
                                    </div>
                                    <div class="card-body">
                                        <Grafico id="myBarChart" tipo="bar" wd="100%" hg="40%"></Grafico>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card mb-4">
                            <TableCustom id="datatablesSimple" title="DataTable Custom Example" colunas={colunas}/>
                        </div>
                    </div>
                </main> */}
                <Footer site="JemoSistemas"/>
            </div>
    </div>
        
    </> 
  );
}
export default Sdbar;