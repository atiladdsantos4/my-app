/* 
commentts
*/

import React, { useState, useEffect } from "react";
import Linha from "./Tr";
import Head from "./Thead"; 
import axios from 'axios';
import ConfGlobal from './../../config.js';
/* componete de arvore de menu exibicao inicial */
const appserver = ConfGlobal.endpoint.url;


function Tda(props){
    return(
       <>
       <td>{props.valor.id}</td>
       <td>{props.valor.name}</td>
       <td>{props.valor.detail}</td>
       <td>{props.valor.created_at}</td>
       <td>{props.valor.updated_at}</td>
       </>
    );
 }    
 
 function Lin(){
    console.log(appserver);
    const [dados,setdados] = useState([]);    
    useEffect(() => {
        debugger;
        axios.get(`${appserver}/product`,{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
           }
        })
          .then((result) => {
            //  setOper('atualizar');
            //  setIdesc(result.data.id);
            setdados(result.data.data);
            //console.log(result.data.data);
         });
        
    },[]); //executa apenas uma vez
       
     return(
        <>
          {dados.map( (dados,index) => <tr><Tda key={index} valor={dados} /></tr>)}
        </>    
    ) 
 }
 
 


function TableCustom(props){
    /*
    props.colunas => vem do caller
    props.title => vem do caller
    const colunas = [
        "name",
		"position",
		"office",
		"age",
		"start_date",
		"salary"
    ];
    */
    const colu = [
         {
            nome:"id",
         },
         {
            nome:"name",
         },
         {
            nome:"detail",
         },
         {
            nome:"created_at",
         },
         {
            nome:"updated_at",
         },
    ];   
    
    const colunas = [
        {
          
          nome:"name",
          estilo:{textAlign:"center"}
        },
        {
            nome:"position",
            estilo:{textAlign:"center"}
        },
        {
            nome:"office",
            estilo:{textAlign:"center"}
        },
        {
            nome:"age",
            estilo:{cursor: 'crosshair'}
        },
        {
            nome:"start_date",
            estilo:{textAlign:"center"}
        },
        {
            nome:"salary",
            estilo:{textAlign:"center"}
        }
    ];
    
    const [col,Setcol] = useState(props.colunas)
    const [title,Settitle] = useState(props.title)
    return(
    <>
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        { props.title }
    </div>
    <div class="card-body">
        <table id={props.id}>
            <thead>
               <Head colunas={colu}/>
            </thead>
            <tfoot>
               <Head colunas={colu}/>
            </tfoot>
            {/* <tbody><Linha/></tbody> */}
            <tbody><Lin/></tbody>
        </table>
    </div>
    </> 
  );
}
export default TableCustom;