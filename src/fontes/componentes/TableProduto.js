/* 
commentts
*/

import { useState, useEffect, useRef, forwardRef  } from "react";
import Linha from "./Tr";
//import Head from "./Thead"; 
import axios from 'axios';
import DataTable from 'datatables.net-react';
import 'datatables.net-responsive-dt';
import 'datatables.net-select-dt';
import DT from 'datatables.net-dt';
//import DT from 'datatables.net-bs5';
import { useNavigate  } from "react-router-dom";
import Splash from "./splash.js";
import { faList,faEdit,faTrash,faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ToastComp from "./toast.js";
import ModalWindow from "./modal.js";
import PlaceholderComp from "../componentes/PlaceholderComp.js";
import StackHeader from "./stack.js";
import ConfGlobal from './../../config.js';
import Cookies from 'js-cookie';
import { OverlayTrigger, Button, Stack, Tooltip, Row, Col } from 'react-bootstrap';
// import Button from 'react-bootstrap/Button';
// import Stack from 'react-bootstrap/Stack';
// import Tooltip from 'react-bootstrap/Tooltip';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import ButtonGrid from "./ButtonGrid.js";
import Placeholder from 'react-bootstrap/Placeholder';


const appserver = ConfGlobal.endpoint.url;

DataTable.use(DT);

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

function TableProduto(props) {
    /* componete de arvore de menu exibicao inicial */
    const [Title,setTitle] = useState(props.title); 
    const [titleheader,setTitleheader] = useState("Listagem"); 
    const [titlesubheader,setTitlesubheader] = useState("Listagem de Produtos"); 
    const [titlebtacao,setTitlebtacao] = useState("Create Product"); 
    const appserver = ConfGlobal.endpoint.url;
    const [dados,setDados] = useState([]);    
    const [col,setCol] = useState(props.colunas)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [splashclasse,setSplashclasse] = useState('exibe');
    const [splashtexto,setSplashtexto] = useState('Aguarde Listando os Produtos');
    //modal//
    const [showmodal,setShowmodal] = useState(false);
    const [idmodal,setIdmodal] = useState('');
    //toast
    const [showtoast, setShowtoast] = useState(false);
    const [msgtoast,setMsgtoast] = useState('Produto Excluído com Sucesso!!');
    const [position,setPosition] = useState('middle-center');
    const [toastrefreshpage,seToastrefreshpage] = useState(true);
    const [strtypeerro, setStrtypeerro] = useState('texto');
    //token auth//
    const [token,setToken] = useState('Bearer '+Cookies.get('_token')); 


    const fechaToast = (newState) => {
        setShowtoast(false);
    }

    
  
    const LinkTo  =  (data) => {
         let url ='/cadastros/form/produto/'+data;
         navigate(url,{ state: { Title: ' Editar Produto' } });
         navigate(0);
         return;
    }

    const NovoProduto  =  () => { //Novo Produto//
      let url ='/cadastros/form/produto';
      navigate(url);
      navigate(0);
      return;
    }

    const handleReload = () =>{
      setSplashclasse('exibe');
      axios.get(`${appserver}/product`,{
        headers: {
           'Accept': 'application/json',
           'Authorization': token
           //'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
           }
        })
        .then((result) => {
           setDados(result.data.data);
           setLoading(false);
           setSplashclasse('esconde');
       });
    }

    const TooltipEdit = (props) => (
        <Tooltip id="button-tooltip" {...props}>
           Editar Registro
        </Tooltip>
        
    );

    const TooltipDelete = (props) => (
        <Tooltip id="button-tooltip" {...props}>
           Deletar Registro
        </Tooltip>
        
    );

    const AbreModal = (data) => (
        setIdmodal(data),
        setShowmodal(true)
    );

    const FecharModal = () => (
       setShowmodal(false)
    );

    const handleDelete = () => (
       setShowmodal(false),
       setSplashtexto("Aguarde Excluido o Registro.."),
       setSplashclasse('exibe'),
       axios.delete(`${appserver}/product/${idmodal}`,{
        headers: {
           'Accept': 'application/json',
           'Authorization': token
           //'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
           }
        })
        .then((result) => {
           setSplashclasse('esconde');
           setShowtoast(true);
           setSplashtexto("'Aguarde Listando os Produtos'")
           //setTimeout(navigate(0) , 2000);
           
        })
    );
 
    
     
    useEffect((props) => {
         axios.get(`${appserver}/product`,{
         headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+Cookies.get('_token'),
            //'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
            }
         })
         .then((result) => {
            setDados(result.data.data);
            setLoading(false);
            setSplashclasse('esconde');
            setLoading(false)
         });
         
    },[]); //executa apenas uma vez
      
    const colunas = [
         { data:"id" },
         { data:"name"},
         { data:"detail"},
         { data:"price"},
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

//place holders//

  const PageHeader = () => {
    //
    return(
      <h1 className="mt-4">{titleheader}</h1>
    )
  }

  const OlPageHeader = () => {
    return(
    <>
      <ol className="breadcrumb mb-4">
           <li className="breadcrumb-item active">{titlesubheader}</li>
      </ol>
    </>
    )
  }
  
  //--> style para palce holders <--//
  const StylePageHeader = {top:'10px',height:'45px',borderRadius:'5px',paddingTop:'5px'}
  const StyleOlPageHeader = {height:'25px',borderRadius:'5px',paddingTop:'5px'}
  const StyleCardHeader = {height:'25px',borderRadius:'5px',paddingTop:'5px'}
  const StyleCampoMd4 = {height:'56px',borderRadius:'5px',paddingTop:'5px'}
  const StyleCampoMdGeral = {height:'320px',borderRadius:'5px',paddingTop:'5px'}

  return (
      <>
        <ToastComp 
            position={position} 
            show={showtoast} 
            texto={msgtoast}
            fundo="success" 
            fechaToast={fechaToast}
            lista={handleReload}
            delay="3000" 
            tipo_erro = {strtypeerro}
            refresh={toastrefreshpage}
        />
        <ModalWindow id={idmodal} title=" Aviso Sistema" titlebody="Deseja Ralmente Excluir o Registro!?" exibe={showmodal} deletarReg={handleDelete} fecharModal={FecharModal}/>
        <Splash classe={splashclasse}  texto={splashtexto}/>
        <div class="container-fluid px-4">
            { loading ? (<><br/>
                          <PlaceholderComp tag="p" bg="" animation="wave" size="2" estilo={StylePageHeader}/> 
                          <PlaceholderComp tag="p" bg="" animation="wave" size="3" estilo={StyleOlPageHeader}/> 
                        </>
                        ) : 
                        (<><PageHeader/><OlPageHeader/></>)
            } 
            {/* <h1 class="mt-4">{titleheader}</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">{titlesubheader}</li>
            </ol> */}
            <div class="card mb-4">
                <div class="card-header">
                {loading ? (<>
                            <PlaceholderComp tag="p" bg="" animation="wave" size="2" estilo={StyleCardHeader}/> 
                           </>) : 
                           (<><i className="fa-solid fa-barcode"></i>{ Title }</>)
                }
                {/* 
                        <FontAwesomeIcon size="xl" className="pointer color_login" icon={faList} />
                        { Title }
                */}
                </div>
                {loading ? (<>
                  <Row>
                     <Col className="text-end" style={{paddingTop: '12px',marginRight:'13px'}}>
                        <Placeholder.Button variant="primary" xs={1}/>
                     </Col>
                  </Row>
                </>) :
                (<ButtonGrid icon={faPlus} click={NovoProduto} textoButton="Novo Produto"></ButtonGrid>)}
                {/* <Row>
                  <Col className="text-end" style={{paddingTop: '12px',marginRight:'13px'}}>
                      <Button variant="primary" type="button" onClick={NovoProduto}>
                      <FontAwesomeIcon size="xl" className="pointer color_login" icon={faPlus} />
                      {' '} 
                       Novo Produto
                      </Button>
                  </Col>
                </Row> */}
                {/* <StackHeader funcButton={NovoProduto} textoButton="Novo Produto" /> */}
                <div class="card-body">  
                    {loading ? (
                        <></> 
                        ) : (
                        <DataTable data={dados} options={{ scrollX:true, responsive: false,select: true, }} columns={colunas} className="display" slots={{
                            6: (data, row) => (
                                <> 
                                  <OverlayTrigger  texto="teste" placement="right" delay={{ show: 250, hide: 400 }} overlay={TooltipEdit}>
                                       <FontAwesomeIcon size="xl" className="pointer color_label" onClick={(e) => LinkTo(row.id)} icon={faEdit} />
                                   </OverlayTrigger> 
                                   {'  '}
                                   <OverlayTrigger  texto="teste" placement="top" delay={{ show: 250, hide: 400 }} overlay={TooltipDelete}>
                                      <FontAwesomeIcon size="xl" className="pointer color_red" onClick={(e) => AbreModal(row.id)} icon={faTrash} />
                                   </OverlayTrigger> 

                                </>    
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
                {/* <TableCustom id="datatablesSimple" title="DataTable Custom Example (React Componente)" colunas={props.colunas}/> */}
            </div>
        </div>
        </>
    );  
  }

export default TableProduto;