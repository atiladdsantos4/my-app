import React, {useState, useEffect} from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import { useNavigate, useParams, useLocation   } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { useNumberFormat } from '@react-input/number-format';
import Image from 'react-bootstrap/Image';
import Splash from "../componentes/splash.js"; 
import SpinnerComp from "../componentes/spinners.js";
import ToastComp from "../componentes/toast.js";
import AlertComp from "../componentes/AlertComp.js";
import axios from 'axios';
import ConfGlobal from './../../config.js';
import Placeholder from 'react-bootstrap/Placeholder';
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
const appserver = ConfGlobal.endpoint.url;
const appserver_img = ConfGlobal.endpoint.img;


function FormProduto(props) {
  
  const location = useLocation();
  const myParam = location.state?.Title;  
  
  const [loading,setLoading] = useState(true);
  
  const [Title,setTitle] = useState(props.title); 
  const [titleheader,setTitleheader] = useState("Cadastros"); 
  const [titlesubheader,setTitlesubheader] = useState("Formulários para Cadastro de Produtos"); 
  const [titlebtacao,setTitlebtacao] = useState("Criar Produto"); 
  
  const [validated, setValidated] = useState(false);
  
  //--> Variaveis de formulário <--//
  const [name,setName] = useState('');
  const [detail,setDetail] = useState('');
  const [price,setPrice] = useState('');
  const [imagem,setImagem] = useState(null);
  const [created_at,setCreatedat] = useState('');
  const [updated_at,setUpdatedat] = useState('');
  const [action,setAction] = useState('insert');

  //upload
  const [imagem_upload,setImagem_upload] = useState(null);
  const [upd_imagem,setUpd_imagem] = useState(false);
  const [img, setImg] = useState([]);
  const [mostraspinner,setMostraspinner] = useState('esconde');
  
  const [formerro,setFormerro] = useState(false);
  const [idProd,setIdProd] = useState('');
  
  //Variáveis de inicialização do Toast Componente 
  const [msgtoast,setMsgtoast] = useState('Login Inválido');
  const [cor,setCor] = useState('danger');
  const [position,setPosition] = useState('middle-center');
  const [showtoast, setShowtoast] = useState(false);
  const [fundo, setFundo] = useState('danger');
  const [strtypeerro, setStrtypeerro] = useState('texto');
  const [delay_toast,setDelay_toast] = useState(3000);
  const [refresh_toast,setRefreshToast] = useState(false);
  
  //Variáveis Alert//
  const [statusAlert,setStatusAlert] = useState(false); 
  const [textAlert,setTexAlert] = useState('Esse é Alerta'); 
  const [colorAlert,setColorAlert] = useState('success'); 
  const [delayAlert,setDelayAlert] = useState(3000); 
  const [typeAlert, setTypeAlert] = useState('warning');

  const [price_mask,setPrice_mask] = useState('0{0}.00');
  const inputRef = useNumberFormat({
    locales: 'en-IN',
    maximumFractionDigits: 2,
  });
  
  //splash
  const [splashclasse,setSplashclasse] = useState('esconde');
  const [splashtexto,setSplashtexto] = useState('Aguarde Salvando as Informações...');

  const [linhadetalhes,setLinhadetalhes] = useState('esconde');

  const navigate = useNavigate();

  const  { id }  = useParams();
  const image = appserver_img+id+'/'+'bola_psg.png';

  const fechaToast = (newState) => {
    setShowtoast(false);
  }
  
  const ListaProdutos = event => {
    navigate('/cadastros/listar/produto');
    navigate(0)
  }

  const handleAlert = event => {
    setStatusAlert(true);
    setTimeout(() => {
        setStatusAlert(false);
    }, delayAlert); 
  }

  const handleUpdImg = event => {
    setMostraspinner('exibe_in');
    if( imagem == null){
      //setMsgtoast('Nenhuma imagem foi selecionada!!');  
      //setShowtoast(true);
      setColorAlert('danger')
      setTexAlert('Nenhuma imagem foi selecionada!!')
      setTypeAlert('warning')
      handleAlert();
      setMostraspinner('esconde');
      return;
    }   
    
    //setSplashtexto('Aguarde Atualizando Produto...');
    //setSplashclasse('exibe');
    const formData = new FormData();
    formData.append('file', img);
    formData.append('only_image', 1);
    formData.append('imagem', imagem);
    formData.append("_method", "put") //--> only if request has file//
    //axios.put(`${appserver}/product/${id}`,{name,detail,price,imagem,img},{
    axios.post(`${appserver}/product/${id}`,formData,{    
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
        }
    })
    .then((response) => {
        if( response.data.status == false ){
            setMostraspinner('esconde'); 
            let erro = response.data.data;
            let erros = [];
            for (const property in erro) {
                console.log('tam'+erro[property].length);
                if( erro[property].length == 1){
                   erros.push(`${property}: ${erro[property]}`); 
                } else {
                   for(let i = 0; i < erro[property].length; i++ ){
                      erros.push(`${property}: ${erro[property][i]}`);  
                   } 
                }
                 
            }
            setColorAlert('danger')
            setStrtypeerro('array')
            setTexAlert(erros);
            setTypeAlert('warning')
            handleAlert();
            
            // setStrtypeerro('array');
            // setMsgtoast(erros);
            // setShowtoast(!showtoast);
        } else {
          setMostraspinner('esconde');   
          setFundo('success');
          setMsgtoast('Imagem carregada com sucesso Selecionada!!');  
          setShowtoast(true);
          setImagem_upload(appserver_img+response.data.data.id+'/'+response.data.data.imagem);
        }  
    })
    .catch(function (error) {
        setMostraspinner('esconde');
        let erro = error.response.data.errors.file;
        let erros = [];
        for(let i = 0 ; i < erro.length; i++ ){
            erros.push(erro[i]); 
        } 
        setStrtypeerro('array');
        setMsgtoast(erros);
        setShowtoast(!showtoast);
    });

  }

  const onImageChange = event => {
    console.log(event.target.files[0]);
    if (event.target.files && event.target.files[0]) {
      let imagem = event.target.files[0];
      setImg(event.target.files[0]);
      setImagem(event.target.files[0].name);
    }
  };
  
  const handleSubmit = (event) => {
       debugger;
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
                setSplashclasse('exibe');
                const formData = new FormData();
                if( imagem != null){
                  formData.append('file', img);
                }
                formData.append('name', name);
                formData.append('detail', detail);
                formData.append('price', price);
                formData.append('imagem', imagem);
                axios.post(`${appserver}/product`,formData,{
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                    }
                })
                    .then((result) => {
                    setSplashclasse('esconde');
                    navigate('/cadastros/listar/produto');
                    navigate(0)
                });
            }

            if( action == 'edit'){
               
                setSplashtexto('Aguarde Atualizando Produto...');
                setSplashclasse('exibe');
                const formData = new FormData();
                if( imagem != null){
                  formData.append('file', img);
                }
                formData.append('name', name);
                formData.append('detail', detail );
                formData.append('price', price);
                formData.append('imagem', imagem);
                formData.append("_method", "put") //--> only if request has file//
                //axios.put(`${appserver}/product/${id}`,{name,detail,price,imagem,img},{
                axios.post(`${appserver}/product/${id}`,formData,{    
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                    }
                })
                .then((response) => {
                    if( response.data.status == false ){
                        setSplashclasse('esconde');
                        setMostraspinner('esconde');
                        let erro = response.data.data;
                        let erros = [];
                        for (const property in erro) {
                            console.log('tam'+erro[property].length);
                            if( erro[property].length == 1){
                               erros.push(`${property}: ${erro[property]}`); 
                            } else {
                               for(let i = 0; i < erro[property].length; i++ ){
                                  erros.push(`${property}: ${erro[property][i]}`);  
                               } 
                            }
                             
                        }
                        setDelay_toast(5000);
                        setRefreshToast(false);
                        setStrtypeerro('array');
                        setMsgtoast(erros);
                        setShowtoast(!showtoast);           
                    } else {
                        setSplashclasse('esconde');
                        setStrtypeerro('texto');
                        setRefreshToast(true);
                        setFundo('success')
                        setMsgtoast('Produto atualizado com success');
                        setShowtoast(!showtoast);           
                        //setLinhadetalhes('exibe');
                        //navigate('/cadastros/listar/produto');
                        //navigate(0)
                    }
                })
                .catch(function (error) {
                    setMostraspinner('esconde');
                    let erro = error.response.data.errors.file;
                    let erros = [];
                    for(let i = 0 ; i < erro.length; i++ ){
                        erros.push(erro[i]); 
                    } 
                    setStrtypeerro('array');
                    setMsgtoast(erros);
                    setShowtoast(!showtoast);
                });
                
            }
        }
   }

   //ediçao//
   useEffect(() => {
        //return;
        
        if( typeof myParam != "undefined"){
            //setLoading(true);
            setTitle(myParam); 
            setTitlebtacao("Edit Product"); 
        } else {
            setLoading(false); 
        }
        let executa =  null
        !!(id) ? executa = true : executa = false;
        if( executa )
        {
            setSplashclasse('exibe');
            setSplashtexto('Aguarde Carregando Produto...');
            axios.get(`${appserver}/product/${id}`,{
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'//oauth2
            }
            })
            .then((result) => {
                if(result.data.status ==  false){
                   setSplashclasse('esconde');
                   setStrtypeerro('texto');
                   setRefreshToast(true);
                   setFundo('danger')
                   setMsgtoast('Produto não encontrado');
                   setShowtoast(!showtoast);  
                   return;
                }
                setLoading(false);
                setImagem_upload(appserver_img+result.data.data.id+'/'+result.data.data.imagem);
                setIdProd(result.data.data.id);    
                setName(result.data.data.name);
                setDetail(result.data.data.detail);
                setPrice(result.data.data.price);
                setCreatedat(result.data.data.created_at);
                setUpdatedat(result.data.data.updated_at);
                setAction('edit');
                setSplashclasse('esconde');
                console.log(result.data.data);
                console.log(action);
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
      <h1 class="mt-4">{titleheader}</h1>
    )
  }

  const OlPageHeader = () => {
    return(
    <>
      <ol class="breadcrumb mb-4">
           <li class="breadcrumb-item active">{titlesubheader}</li>
      </ol>
    </>
    )
  }

  return (
    <>
    <Splash classe={splashclasse}  texto={splashtexto}/>
    <div class="container-fluid px-4">
        { loading ? (<><br/>
                      <Placeholder as="p" animation="wave">
                           <Placeholder xs={2} style={{top:'10px',height:'45px',borderRadius:'5px',paddingTop:'5px'}}/>
                      </Placeholder>    
                      <Placeholder as="p" animation="wave">
                            <Placeholder xs={3} style={{height:'25px',borderRadius:'5px',paddingTop:'5px'}}/>
                       </Placeholder>

                     </>) : 
            (<><PageHeader/><OlPageHeader/></>)
        } 
        {/* <h1 class="mt-4">{titleheader}</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">{titlesubheader}</li>
        </ol> */}
        <AlertComp status={statusAlert} message={textAlert} color={colorAlert} tipo={typeAlert} tipo_erro = {strtypeerro}/>
        <div class="card mb-4">
            <div class="card-header">
                {loading ? (<><Placeholder xs={2} style={{height:'25px',borderRadius:'5px',paddingTop:'5px'}}/></>) : (<><i class="fa-solid fa-barcode"></i>{ Title }</>)}
                    
            </div>
            <div class="card-body">  
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="4" controlId="validationCustom01">
                                {/* <Form.Label>First name</Form.Label> */}
                                {loading ? (<></>) :
                                (<Form.Floating className="mb-3">
                                        <Form.Control
                                            required
                                            type="text"
                                            name="produto"
                                            placeholder="Nome do Produto"
                                            onChange={e => setName(e.target.value)}
                                            defaultValue={name}
                                        />
                                        <label htmlFor="floatingInputCustom">Produto</label>
                                        <Form.Control.Feedback type="invalid">Informe o nome do produto</Form.Control.Feedback>
                                </Form.Floating>)
                                }
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                {/* <Form.Label>First name</Form.Label> */}
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                            required
                                            type="text"
                                            name="detail"
                                            placeholder="Detalhes do Produto"
                                            onChange={e => setDetail(e.target.value)} 
                                            defaultValue={detail}
                                        />
                                        <label htmlFor="floatingInputCustom">Detalhes</label>
                                    <Form.Control.Feedback type="invalid">Informe o detalhe do produto</Form.Control.Feedback>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                {/* <Form.Label>First name</Form.Label> */}
                                <Form.Floating className="mb-3">
                                    <Form.Control
                                            required
                                            type="text"
                                            name="price"
                                            ref={inputRef}
                                            placeholder="Preço do Produto"
                                            onChange={e => setPrice(e.target.value)} 
                                            value={price}
                                        />
                                        <label htmlFor="floatingInputCustom">Preço</label>
                                    <Form.Control.Feedback type="invalid">Informe o preço do produto</Form.Control.Feedback>
                                </Form.Floating>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} md="8" size="sm" controlId="validationCustom02">
                              {/* <Form.Label>First name</Form.Label> */}
                               <Form.Floating className="mb-3">
                                   <Form.Control
                                        size="sm"
                                        type="file"
                                        //required="required"
                                        onChange={onImageChange}
                                    />
                                    <label htmlFor="floatingInputCustom">Carregar Imagem</label>
                                    <Form.Control.Feedback type="invalid">Informe o preço do produto</Form.Control.Feedback>
                                </Form.Floating>
                            </Form.Group> 
                            <Col xs={12} md={4}>
                               <div style={{ color:'#6E7174', padding:'4px',border: '1px solid #ced4da', fontSize: '16px',borderRadius:'5px' }}> 
                                    Imagem Produto { action === 'edit' ?<Button style={{marginTop:'-2px'}} variant="success" type="button" size="sm" onClick={handleUpdImg}>
                                          <SpinnerComp mostra={mostraspinner}/>{' '} Alterar</Button> : null
                                        }
                                  <div style={{padding:'5px'}}>
                                    <Image className="imagem_profile" src={imagem_upload} rounded />  
                                  </div>
                               </div>
                            </Col>
                        </Row>
                        <Row id="linha_detalhes">
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                {/* <Form.Label>First name</Form.Label> */}
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
                            </Form.Group>
                            <Form.Group as={Col} md="4" controlId="validationCustom02">
                                {/* <Form.Label>First name</Form.Label> */}
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
                            </Form.Group>
                        </Row>
                        <Row style={{paddingTop:'8px'}}>
                            <Col xs={6} md={2}>
                            { loading ? (<><Placeholder.Button variant="primary" xs={7}/></>) : (
                                <Button type="submit">{titlebtacao}</Button>
                             )} 
                            </Col>
                            <Col xs={6} md={2}> 
                            { loading ? (<><Placeholder.Button variant="warning" xs={7}/></>) : (
                               <Button variant="warning" type="button" onClick={ListaProdutos}>Listar Produtos</Button>
                             )}
                            </Col>
                        </Row> 
                    </Form>
            </div>     
            {/* <TableCustom id="datatablesSimple" title="DataTable Custom Example (React Componente)" colunas={props.colunas}/> */}
        </div>
        <ToastComp 
            position={position}
            show={showtoast} 
            texto={msgtoast}
            fechaToast={fechaToast}
            fundo={fundo}
            delay={delay_toast}
            tipo_erro = {strtypeerro}
            lista={ListaProdutos}
            refresh={refresh_toast} // define se da um refresh de pagina  
       />

    </div>

    </>
  );
}

export default FormProduto;