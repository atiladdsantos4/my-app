/* 
commentts
*/

import { useState, useEffect, useRef, forwardRef  } from "react";
import Linha from "./Tr";
//import Head from "./Thead"; 
import axios from 'axios';
import ConfGlobal from './../../config.js';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import DT from 'datatables.net-dt';
//import DT from 'datatables.net-bs5';
import { useNavigate  } from "react-router-dom";
import Splash from "./splash.js";
import { faCoffee,faEyeSlash,faEye,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
DataTable.use(DT);



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
 
function TableCustom22(props){
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
   
   const [col,Setcol] = useState(props.colunas)
   const [title,Settitle] = useState(props.title)
   const [dados,setdados] = useState([]);    
   const [loading, setLoading] = useState(true);

   useEffect((props) => {
       debugger;
       const script1 = document.createElement('script');
       script1.src = "/sb_black/js/datatables-simple-demo.js";
       script1.async = true;
       document.body.appendChild(script1);
   
       axios.get(`${appserver}/product`,{
         headers: {
           'Accept': 'application/json',
           'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
          }
       })
         .then((result) => {
           setdados(result.data.data);
           setLoading(false);
        });
       
   },[]); //executa apenas uma vez



   return (
    <>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        
        <table id={props.id}>
            <thead>
               <Head colunas={colu}/>
            </thead>
            <tfoot>
               <Head colunas={colu}/>
            </tfoot>
          <tbody>
            {/* Map through the data array to create table rows */}
            {dados.map((item, index) => (
              <tr key={index}>
                {/* Map through the values of each data object to create table cells */}
                {Object.values(item).map((value, index) => (
                  <td key={index}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
    // {new simpleDatatables.DataTable(datatablesSimple);}
  );
}

function TableFinal(props){
    const [loading, setLoading] = useState(true);

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
   const [col,Setcol] = useState(props.colunas)
   const [title,Settitle] = useState(props.title)
   return(
    <>
    <div class="card-header">
        <i class="fas fa-table me-1"></i>
        <i class="fa-classic fa-regular fa-user"></i>
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
            <tbody><Lin/></tbody>
        </table>
    </div>
    </> 
   );
} 


// function TableCustom(props){
//     return(
//        <>
//          <TableFinal/>
//        </>  
//     );     
// }

function TableCustom1(props){
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
    const visao  = () => {
        return <>
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
    }
    
    return(
       visao()
    );
}


function Head(props){
  const [header,setHeader] = useState(props.colunas);    
   //const noPointer = {cursor: 'crosshair'}; //<th style={noPointer}>{head.nome}</th>
  const noPointer = {cursor: 'crosshair',color: 'blue !important'};
    return(
       <>
         <thead>
         <tr>
         {header.map( (item,i) => 
             <th key={i}>{item.data}</th>
          )}
         </tr>  
         </thead> 
      </>    
   ) 
}

function TableCustom(props) {
      /*const dados1 = {
         "data": [
            {
                "id": "1",
                "name": "bola de campo",
                "detail": "oficial do psg2",
                "created_at": "10/04/2025 21:57:15",
                "updated_at": "10/04/2025 23:00:19"
            },
            {
                "id": "2",
                "name": "sandalia",
                "detail": "havaiana",
                "created_at": "10/04/2025 21:58:33",
                "updated_at": "10/04/2025 21:58:33"
            },
            {
                "id": "3",
                "name": "mesa de jantar",
                "detail": "feita em mogno",
                "created_at": "11/04/2025 10:47:09",
                "updated_at": "27/04/2025 16:31:22"
            },
            {
                "id": "4",
                "name": "mesa de vidro",
                "detail": "tramontina",
                "created_at": "11/04/2025 10:47:09",
                "updated_at": "27/04/2025 16:31:22"
            },
            {
                "id": "5",
                "name": "jarra de suco",
                "detail": "tramontina",
                "created_at": "11/04/2025 10:47:09",
                "updated_at": "11/04/2025 10:47:09"
            }
          ]
      }*/   
      const [dados,setDados] = useState([]);    
      const [col,setCol] = useState(props.colunas)
      const [title,setTitle] = useState(props.title)
      const [loading, setLoading] = useState(true);
      const navigate = useNavigate();
  
      const LinkTo  =  (data) => {
         let url ='/cadastros/produto/'+data;
         navigate(url,{ state: { Title: 'Editar Produto' } });
         navigate(0);
         return;
      }
     
      useEffect((props) => {
         debugger;
         axios.get(`${appserver}/product`,{
         headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
            }
         })
         .then((result) => {
            setDados(result.data.data);
            setLoading(false);
         });
         
      },[]); //executa apenas uma vez
      
      const colunas = [
         { data:"id" },
         { data:"name"},
         { data:"detail"},
         { data:"created_at"},
         { data:"updated_at"},
         { data:"action"}
   ];
   
   const columns = [
      { data: 'id' },
      { data: 'name' },
      { data: 'detail' },
      { data: 'created_at' },
      { data: 'updated_at' },
      { data: 'action' },
    ];
    return (
      <>
     <div class="card-header">
            <i class="fas fa-table me-1"></i>
            <i class="fa-classic fa-solid fa-user"></i>
            
            { props.title }
      </div>
      <div class="card-body">  
      {loading ? (
          <Splash classe="exibe" texto="Aguarde Carregando as Infomações"/>
        ) : (
         <DataTable data={dados} options={{ responsive: true,select: true, }} columns={colunas} className="display" slots={{
            5: (data, row) => (
                <FontAwesomeIcon size="xl" className="pointer color_label" onClick={(e) => LinkTo(row.id)} icon={faEdit} />
            )
        }}> 
            <Head colunas={colunas}/>
            {/* <thead>
            <tr>
               <th>id</th>
               <th>name</th>
               <th>detail</th>
               <th>created_at</th>
               <th>updated_at</th>
            </tr>
            </thead> */}
               {/* <Head colunas={colu}/> */}
         </DataTable>
      )}
      </div>
      </>
      // {new simpleDatatables.DataTable(datatablesSimple);}
    );  
  }

export default TableCustom;