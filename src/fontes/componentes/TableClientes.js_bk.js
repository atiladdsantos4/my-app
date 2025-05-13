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
import { faList,faEdit,faTrash,faToggleOn,faToggleOff} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Tooltip from 'react-bootstrap/Tooltip';
import ToastComp from "./toast.js";
import ModalWindow from "./modal.js";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import StackHeader from "./stack.js";
import ConfGlobal from './../../config.js';
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
        axios.get(`${appserver}/cliente`,{
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
           }
        })
          .then((result) => {
            setdados(result.data.data);
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

function TableCliente(props) {
    /* componete de arvore de menu exibicao inicial */
    const [Title,setTitle] = useState(props.title); 
    const [titleheader,setTitleheader] = useState("Listagem"); 
    const [titlesubheader,setTitlesubheader] = useState("Listagem de Clientes"); 
    const [titlebtacao,setTitlebtacao] = useState("Create Product"); 
    const appserver = ConfGlobal.endpoint.url;
    const [dados,setDados] = useState([]);    
    const [col,setCol] = useState(props.colunas)
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [splashclasse,setSplashclasse] = useState('exibe');
    const [splashtexto,setSplashtexto] = useState('Aguarde Listando os Clientes...');
    //modal//
    const [showmodal,setShowmodal] = useState(false);
    const [idmodal,setIdmodal] = useState('');
    //toast
    const [showtoast, setShowtoast] = useState(false);
    const [msgtoast,setMsgtoast] = useState('Produto Excluído com Sucesso!!');
    const [toastrefreshpage,seToastrefreshpage] = useState(true);
    
    const fechaToast = (newState) => {
        setShowtoast(false);
    }

    
  
    const LinkTo  =  (data) => {
         let url ='/cadastros/form/cliente/'+data;
         navigate(url,{ state: { Title: ' Editar Produto' } });
         navigate(0);
         return;
    }

    const NovoCliente  =  () => { //Novo Produto//
      let url ='/cadastros/form/cliente';
      navigate(url);
      navigate(0);
      return;
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
       //console.log('deletei:'+idmodal)
       setShowmodal(false),
       setSplashtexto("Aguarde Excluido o Registro.."),
       setSplashclasse('exibe'),
       axios.delete(`${appserver}/cliente/${idmodal}`,{
        headers: {
           'Accept': 'application/json',
           'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
           }
        })
        .then((result) => {
           setSplashclasse('esconde');
           setMsgtoast('Cliente Excluído com Sucesso!!');
           setShowtoast(true);
           setSplashtexto("'Aguarde Listando os Clientes'")
        })
    );
 
    const handleAtivo = (row,data) =>{
        console.log(data);
        //cli_id,cli_type,cli_name,cli_cpf_cnpj,cli_ativo,created_at,updated_at,deleted_at
        let type = row.cli_type.indexOf('Fis') > 0 ? 1 : 2;
        const id = row.cli_id;
        const cli_type = type;
        //row.cli_type;
        const cli_name = row.cli_name;
        const cli_cpf_cnpj = row.cli_cpf_cnpj
        const cli_ativo = row.cli_ativo == 0 ? 1 : 0;
        setSplashtexto('Aguarde Atualizando Cliente...');
        setSplashclasse('exibe');
        axios.put(`${appserver}/cliente/${id}`,{cli_type,cli_name,cli_cpf_cnpj,cli_ativo},{
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
            }
        })
            .then((result) => {
               setMsgtoast('Status do Cliente Alterado');    
               setSplashclasse('esconde');
               setShowtoast(true);
               //navigate('/cadastros/listar/cliente');
               //navigate(0)
        });
        console.log(row.cli_id); 
        console.log(row.cli_name); 
    }
    //icons//
    const fa01(valor)
    
     
    useEffect((props) => {
         debugger;
         axios.get(`${appserver}/cliente`,{
         headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
            }
         })
         .then((result) => {
            setDados(result.data.data);
            setLoading(false);
            setSplashclasse('esconde');
         });
         
    },[]); //executa apenas uma vez
      //cli_id, cli_type, cli_name, cli_cpf_cnpj, cli_ativo, created_at, updated_at, deleted_at
    const colunas = [
         { data:"cli_id", className:'dt-centro' },
         { data:"cli_type"},
         { data:"cli_name"},
         { data:"cli_cpf_cnpj", className:'dt-centro' },
         { data:"cli_ativo" , className:'dt-centro' },
         { data:"created_at", className:'dt-direita' },
         { data:"updated_at", className:'dt-direita' },
         { data:"action" , className:'dt-centro' },
    ];
   
    const columns = [
      { data: 'id', className:'color_label' },
      { data: 'name' },
      { data: 'detail' },
      { data: 'created_at' },
      { data: 'updated_at' },
      { data: 'action' },
    ];
    return (
      <>
        <ToastComp 
            position="middle-center" 
            show={showtoast} 
            texto={msgtoast}
            fundo="success" 
            fechaToast={fechaToast}
            delay="3000" 
            refresh={toastrefreshpage}
        />
        <ModalWindow id={idmodal} title=" Aviso Sistema" titlebody="Deseja Ralmente Excluir o Registro!?" exibe={showmodal} deletarReg={handleDelete} fecharModal={FecharModal}/>
        <Splash classe={splashclasse}  texto={splashtexto}/>
        <div class="container-fluid px-4">
            <h1 class="mt-4">{titleheader}</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">{titlesubheader}</li>
            </ol>
            <div class="card mb-4">
                <div class="card-header">
                        <FontAwesomeIcon size="xl" className="pointer color_login" icon={faList} />
                        { Title }
                </div>
                <StackHeader funcButton={NovoCliente} textoButton="Novo Cliente" />
                <div class="card-body">  
                    {loading ? (
                        <></> 
                        ) : (
                        <DataTable data={dados}  options={{ responsive: true,select: true, }} columns={colunas} className="display" slots={
                            {
                                4:(data, row) => (
                                    //data.className="dt-type-numeric"
                                    <>
                                    {row.cli_ativo == 1 ? <FontAwesomeIcon onClick={(e) => handleAtivo(row)} size="xl" className="pointer color_label" icon={faToggleOn} /> : <FontAwesomeIcon size="xl" onClick={(e) => handleAtivo(row)} className="pointer color_label" icon={faToggleOff} />} 
                                    </>
                                ),
                                7: (data, row) => (
                                    <> 
                                    <OverlayTrigger  texto="teste" placement="right" delay={{ show: 250, hide: 400 }} overlay={TooltipEdit}>
                                        <FontAwesomeIcon size="xl" className="pointer color_label" onClick={(e) => LinkTo(row.cli_id)} icon={faEdit} />
                                    </OverlayTrigger> 
                                    {'  '}
                                    <OverlayTrigger  texto="teste" placement="top" delay={{ show: 250, hide: 400 }} overlay={TooltipDelete}>
                                        <FontAwesomeIcon size="xl" className="pointer color_red" onClick={(e) => AbreModal(row.cli_id)} icon={faTrash} />
                                    </OverlayTrigger> 

                                    </>    
                                )
                                
                            }
                        }> 
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

export default TableCliente;