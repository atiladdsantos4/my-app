import React, {useState, useEffect} from "react";
//import Button from 'react-bootstrap/Button';
import { Col, Form, Button, InputGroup, Row, Placeholder} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useParams, useLocation   } from "react-router-dom";
import Splash from "../componentes/splash.js"; 
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import PlaceholderComp from "../componentes/PlaceholderComp.js";
// import { useMask, format  } from '@react-input/mask';
// import InputMask from 'react-input-mask';
import { IMaskInput } from "react-imask";
import ConfGlobal from './../../config.js';
const appserver = ConfGlobal.endpoint.url;


function FormCliente(props) {
  
  const location = useLocation();
  const myParam = location.state?.Title;  

  const [loading,setLoading] = useState(true);
  
  const [Title,setTitle] = useState(props.title); 
  const [titleheader,setTitleheader] = useState("Cadastros"); 
  const [titlesubheader,setTitlesubheader] = useState("Formulários para Cadastro de Clientes"); 
  const [titlebtacao,setTitlebtacao] = useState("Criar Cliente"); 
  
  const [validated, setValidated] = useState(false);
  
  //--> Variaveis de formulário <--//
  //cli_id, cli_type, cli_name, cli_cpf_cnpj, cli_ativo, created_at, updated_at, deleted_at
  const [cli_type,setCli_type] = useState('');
  const [cli_name,setCli_name] = useState('');
  const [cli_cpf_cnpj,setCli_cpf_cnpj] = useState('');
  const [ckcli_ativo,setCkcli_ativo] = useState(true);
  //const [cli_ativo,setCli_ativo] = useState(0);
  //const [name,setName] = useState('');
  //const [detail,setDetail] = useState('');
  const [created_at,setCreatedat] = useState('');
  const [updated_at,setUpdatedat] = useState('');
  const [action,setAction] = useState('insert');
  const [formerro,setFormerro] = useState(false);
  const [idCli,setidCli] = useState('');
  const [cli_mask,setCli_mask] = useState('000.000.000-00');
  
  //splash
  const [splashclasse,setSplashclasse] = useState('esconde');
  const [splashtexto,setSplashtexto] = useState('Aguarde Salvando as Informações...');

  const [linhadetalhes,setLinhadetalhes] = useState('esconde');

  const navigate = useNavigate();

  const  { id }  = useParams();
 

  const ListaClientes = event => {
    navigate('/cadastros/listar/cliente');
    navigate(0)
  }
  /*
  //input mask 
  const inputCPFRef = useMask({
    //mask: '+0 (___) ___-__-__',
    mask: '___.___.___-__',
    replacement: { _: /\d/ },
  });

  const inputCNPJRef = useMask({
    //mask: '+0 (___) ___-__-__',
    mask: '__.___.___/____-__',
    replacement: { _: /\d/ },
  });

  

  const setMask = (valor) =>{
    setCli_type(valor);
    if( valor == 1  ){
        setCli_mask(inputCPFRef)

    } else {
        setCli_mask(inputCNPJRef);
    }     
    //console.log('muda:'+valor);
  }
  */
 
  const setMask = (valor) =>{
    setCli_type(valor);
    //console.log('1212121232323231');
    if( valor == 1  ){
       setCli_mask('000.000.000-00')
       //setCli_cpf_cnpj('1212121232323231');

    } else {
       setCli_mask('00.000.000/0000-00');
       //setCli_cpf_cnpj('1212121232323231');
    }     

  }



  const handleSubmit = (event) => {
       debugger;
       //console.log(cli_ativo);
       const cli_ativo = ckcli_ativo ? 1 : 0;
       console.log(cli_ativo);
       //return;
        let erro = false;
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            console.log('entrei aqui');
            erro = true;
        }
        event.preventDefault();
        setValidated(true);
        if( erro == false ){
            if( action == 'insert'){
                ////cli_id, cli_type, cli_name, cli_cpf_cnpj, cli_ativo, created_at, updated_at, deleted_at
                setSplashclasse('exibe');
                axios.post(`${appserver}/cliente`,{cli_type,cli_name,cli_cpf_cnpj,cli_ativo},{
                    headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                    }
                })
                    .then((result) => {
                    setSplashclasse('esconde');
                    navigate('/cadastros/listar/cliente');
                    navigate(0)
                });
            }

            if( action == 'edit'){
               
                setSplashtexto('Aguarde Atualizando Produto...');
                setSplashclasse('exibe');
                axios.put(`${appserver}/cliente/${id}`,{cli_type,cli_name,cli_cpf_cnpj,cli_ativo},{
                    headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                    }
                })
                    .then((result) => {
                    setSplashclasse('esconde');
                    setLinhadetalhes('exibe');
                    navigate('/cadastros/listar/cliente');
                    navigate(0)
                });
                
            }
        }
   }

   const handleAccept = (val) => {
      setCli_cpf_cnpj(val);
   };

   //ediçao//
   useEffect(() => {
      
        //return;
        if( typeof myParam != "undefined"){
            setTitle(myParam); 
            setTitlebtacao("Editar Cliente"); 
        } else {
            setLoading(false);
        }
        let executa =  null
        !!(id) ? executa = true : executa = false;
        if( executa )
        {
            setSplashclasse('exibe');
            setSplashtexto('Aguarde Carregando os dados do Cliente...');
            axios.get(`${appserver}/cliente/${id}`,{
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
            }
            })
            .then((result) => {
                console.log(result.data.data);
                
                if(result.data.data.cli_type == 1 ){
                   setCli_mask('000.000.000-00')
                } else {
                   setCli_mask('00.000.000/0000-00');
                }
                //let cli_cpf_cnpj = result.data.data.cli_cpf_cnpj;
                //'00.000.000/0000-00';
                setCli_cpf_cnpj(result.data.data.cli_cpf_cnpj);     
                //iMaskProps.maskRef.current.updateValue();
                setidCli(result.data.data.cli_id);    
                setCli_name(result.data.data.cli_name);
                setCli_type(result.data.data.cli_type);
                if( result.data.data.cli_ativo == 1 ){
                    setCkcli_ativo(true);
                } else {
                    setCkcli_ativo(false);
                }    
                setCreatedat(result.data.data.created_at);
                setUpdatedat(result.data.data.updated_at);
                setAction('edit');
                setSplashclasse('esconde');
                setLoading(false);
            //setLoading(false);
            });
        } else {
            setLinhadetalhes('esconde');
            document.getElementById('linha_detalhes').style.display = 'none';
            console.log('sem parametros');
        }
        
    },[]); //executa apenas uma vez

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
  const StyleCampoMd4 = {height:'58px',borderRadius:'5px',paddingTop:'5px'}
  const StyleCheck = {height:'20px',borderRadius:'5px',paddingTop:'5px'}

  return (
    <>
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
                    {/* <i class="fa-solid fa-barcode"></i>                
                    { Title } */}
            </div>
            <div class="card-body">  
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                            {/* <Form.Label>First name</Form.Label> */}
                            {loading ? (<><PlaceholderComp tag="p" bg="secondary" animation="wave" size="12" estilo={StyleCampoMd4}/></>
                             ) : (
                            <Form.Floating className="mb-3">
                                    <Form.Control
                                        required
                                        type="text"
                                        name="cli_name"
                                        placeholder="Nome do Cliente"
                                        onChange={e => setCli_name(e.target.value)}
                                        defaultValue={cli_name}
                                    />
                                    <label htmlFor="floatingInputCustom">Nome do Cliente</label>
                                    <Form.Control.Feedback type="invalid">Informe o Nome do Cliente</Form.Control.Feedback>
                            </Form.Floating>
                             )}
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                            {loading ? (<><PlaceholderComp tag="p" bg="secondary" animation="wave" size="12" estilo={StyleCampoMd4}/></>
                             ) : (
                            <Form.Floating className="mb-3">
                                <FloatingLabel controlId="floatingSelect" label="Tipo de Ciente">
                                    <Form.Select aria-label="Floating label select example" required onChange={e => setMask(e.target.value)} value={cli_type}>
                                        <option value="">Tipo de Cliente</option>
                                        <option value="1">Pessoa Física</option>
                                        <option value="2">Pessoa Juridica</option>
                                    </Form.Select>
                                </FloatingLabel>
                                    {/* <Form.Control
                                        required
                                        type="text"
                                        name="cli_type"
                                        placeholder="Tipo de Cliente"
                                        onChange={e => setCli_type(e.target.value)} 
                                        defaultValue={cli_type}
                                    />
                                    <label htmlFor="floatingInputCustom">Tipo de Cliente</label> */}
                                    <Form.Control.Feedback type="invalid">Informe o Tipo de Cliente</Form.Control.Feedback>
                            </Form.Floating>
                             )}
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom03">
                            {loading ? (<><PlaceholderComp tag="p" bg="secondary" animation="wave" size="12" estilo={StyleCampoMd4}/></>
                             ) : (
                                <Form.Floating className="mb-3">
                                        <Form.Control
                                            as={IMaskInput}
                                            required
                                            type="text"
                                            name="cli_cpf_cnpj"
                                            placeholder="CNPJ/CPF"
                                            mask={cli_mask}
                                            placeholder="Digite se CPF"
                                            onAccept={handleAccept}
                                            value={cli_cpf_cnpj}
                                        />
                                        <label htmlFor="floatingInputCustom">CNPJ/CPF</label>
                                        <Form.Control.Feedback type="invalid">Informe o CNPJ/CPF do Cliente</Form.Control.Feedback>
                                </Form.Floating>
                             )}
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom04">
                            {loading ? (<><PlaceholderComp tag="p" bg="secondary" animation="wave" size="3" estilo={StyleCheck}/></>
                             ) : (
                                <Form.Check
                                    label="Ativo"
                                    feedback="O campo ativo deve esta Marcado"
                                    feedbackType="invalid"
                                    defaultChecked = {ckcli_ativo}
                                    onClick={ e => setCkcli_ativo(e.target.checked)}
                                />)}
                            </Form.Group>
                        </Row>
                        <Row id="linha_detalhes">
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                  {/* <Form.Label>First name</Form.Label> */}
                                  {loading ? (<><PlaceholderComp tag="p" bg="secondary" animation="wave" size="12" estilo={StyleCampoMd4}/></>
                                   ) : (
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="detail"
                                            readOnly
                                            //onChange={e => setCreatedat(e.target.value)} 
                                            defaultValue={created_at}
                                        />
                                        <label htmlFor="floatingInputCustom">Data Criação</label>
                                    </Form.Floating>
                                )}
                                </Form.Group>
                                <Form.Group as={Col} md="4" controlId="validationCustom02">
                                  {/* <Form.Label>First name</Form.Label> */}
                                  {loading ? (<><PlaceholderComp tag="p" bg="secondary" animation="wave" size="12" estilo={StyleCampoMd4}/></>
                                   ) : (
                                    <Form.Floating className="mb-3">
                                        <Form.Control
                                            type="text"
                                            name="detail"
                                            readOnly
                                            //onChange={e => setDetail(e.target.value)} 
                                            defaultValue={updated_at}
                                        />
                                        <label htmlFor="floatingInputCustom">Última Atualização</label>
                                    </Form.Floating>
                                )}
                                </Form.Group>
                            </Row>
                        <Row>
                            <Col xs={2}> 
                            { loading ? (<><Placeholder.Button variant="primary" xs={7}/></>) : (
                               <Button type="submit">{titlebtacao}</Button>
                            )}    
                            </Col>
                            <Col xs={2}> 
                            { loading ? (<><Placeholder.Button variant="warning" xs={7}/></>) : (
                                <Button variant="warning" type="button" onClick={ListaClientes}>Listar Clientes</Button>
                            )}    
                            </Col>
                        </Row> 
                    </Form>
            </div>     
        </div>
    </div>
    </>
  );
}

export default FormCliente;