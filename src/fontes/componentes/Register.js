import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEyeSlash, faEye, faUserAltSlash, faUsersLine } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { useNavigate, useParams, useLocation   } from "react-router-dom";
import Splash from "../componentes/splash.js"; 
import ToastComp from "./toast.js";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import SpinnerComp from "./spinners.js";
import Form  from "react-bootstrap/Form";
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";
import InputGroup from 'react-bootstrap/InputGroup';
import ConfGlobal from './../../config.js';
import Cookies from 'js-cookie';

const appserver = ConfGlobal.endpoint.url;


function Register(){
  
  // --> Variáveis de form <<-- //
  const [validated, setValidated] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [senha, setSenha] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [typesenha,setTypesenha] = useState('password');
  const [icontypesenha,setIcontypesenha] = useState(faEyeSlash);
  const [retypesenha,setRetypesenha] = useState('');
  const [retype,setRetype] = useState('password');
  const [iconretypesenha,setIconretypesenha] = useState(faEyeSlash);
  const [erro,setErro] = useState(false);
  
  //--> spinner <--//
  const [mostraspinner,setMostraspinner] = useState('esconde');
  
  //--> Variáveis de inicialização do Toast Componente <--// 
  const [msgtoast,setMsgtoast] = useState('Login Inválido');
  const [cor,setCor] = useState('danger');
  const [position,setPosition] = useState('middle-center');
  const [showtoast, setShowtoast] = useState(false);
  const [fundo, setFundo] = useState('danger');
  const [strtypeerro, setStrtypeerro] = useState('texto');
  const [delay_toast,setDelay_toast] = useState(3000);
  const [refresh_toast,setRefreshToast] = useState(false);
  const navigate = useNavigate();
  
  const fechaToast = (newState) => {
    setShowtoast(false);
  }

  const handleLogin = () => {
     navigate('/');
     navigate(0) 
  }

  const handleSubmit = (event) => {
    //    event.preventDefault();
    //    event.stopPropagation();
    //    setFundo('success');
    //    setStrtypeerro('texto');
    //    setMsgtoast('este é um erro do tipo texto');
    //    setShowtoast(!showtoast);
    //    return;
       let erro = false;
       console.log('submit');
       setMostraspinner('exibe_in');
       const form = event.currentTarget;
       if (form.checkValidity()) {
           setValidated(true);
           setMostraspinner('esconde');
           erro = false;//setErro(true)
           //console.log('entrei aqui validation');
           event.preventDefault();
           event.stopPropagation();
       }
       
    //    console.log(erro);
    //    if( erro == false ){
    //       console.log('Erro:'+erro);
    //    } else {
    //       console.log('Erro:'+erro); 
    //    }
    //    return
       if( erro == false ){
            const name = firstName;
            const password = senha;
            axios.post(`${appserver}/auth/register`,{name,email,password},{    
                    headers: {
                    'Accept': 'application/json',
                    //'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                    }
                })
                .then((response) => {
                    setMostraspinner('esconde');
                    if(response.data.status ==  true){
                       console.log('entrei aqui token'); 
                       let token = response.data.token;
                       Cookies.set('_token', token,{ path: '/' });
                       setFundo('success');
                       setStrtypeerro('texto');
                       setMsgtoast('Usuário criado com Sucesso');
                       setRefreshToast(true);
                       setShowtoast(true);
                       setShowtoast(!showtoast);
                    }
                    console.log(response.data)   
                    //setSplashclasse('esconde');
                    //setLinhadetalhes('exibe');
                    //navigate('/cadastros/listar/produto');
                    //navigate(0)
                })
                .catch(function (error) {
                    setMostraspinner('esconde');
                    let erro =  error.response.data.errors;
                    let erros = [];
                    for (const property in erro) {
                        erros.push(`${property}: ${erro[property]}`);
                        //strerro+=`${property}: ${erro[property]}`;
                        //console.log(`${property}: ${erro[property]}`);
                    }
                    //console.log(erros);
                    setStrtypeerro('array');
                    setMsgtoast(erros);
                    setShowtoast(!showtoast);
                });
        }        
  }
  
  function exibeSenha(event){
      if( typesenha == 'password' ){
          setIcontypesenha(faEye);     
      } else {
          setIcontypesenha(faEyeSlash);      
      }
      setTypesenha(typesenha == 'password' ? 'text' : 'password');   
      return;    
  };

  function exibeRetypeSenha(event){
    if( retype == 'password' ){
        setIconretypesenha(faEye);     
    } else {
        setIconretypesenha(faEyeSlash);      
    }
    setRetypesenha(retypesenha == 'password' ? 'text' : 'password');   
    return;    
};
    
  document.getElementsByTagName("body")[0].className = "bg-primary";
  
  return(
   <>  
   <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-7">
                                <div class="card shadow-lg border-0 rounded-lg mt-5">
                                    <div class="card-header">
                                        <h3 class="text-center font-weight-light my-4">
                                            <FontAwesomeIcon size="xl" className="pointer color_login" icon={faUsersLine} /> Create Account
                                        </h3>
                                    </div>
                                    <div class="card-body">
                                      <Form noValidate validated={validated} onSubmit={handleSubmit}> 
                                          <Row className="mb-3">
                                            <Form.Group as={Col} md="6" controlId="validation01">
                                                {/* <Form.Label>First name</Form.Label> */}
                                                <Form.Floating className="mb-3">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Informe o primeiro nome"
                                                            onChange={e => setFirstName(e.target.value)}
                                                            defaultValue={firstName}
                                                        />
                                                        <label htmlFor="floatingInputCustom">Primeiro Nome</label>
                                                        <Form.Control.Feedback type="invalid">Informe o primeiro nome</Form.Control.Feedback>
                                                </Form.Floating>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="6" controlId="validation02">
                                                {/* <Form.Label>First name</Form.Label> */}
                                                <Form.Floating className="mb-3">
                                                        <Form.Control
                                                            required
                                                            type="text"
                                                            placeholder="Informe o último nome"
                                                            onChange={e => setLastName(e.target.value)}
                                                            defaultValue={firstName}
                                                        />
                                                        <label htmlFor="floatingInputCustom">Último Nome</label>
                                                        <Form.Control.Feedback type="invalid">Informe o último nome</Form.Control.Feedback>
                                                </Form.Floating>
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                          </Row>  
                                          <Row className="mb-3">
                                                <Form.Group as={Col} md="12" controlId="validation02">
                                                    {/* <Form.Label>First name</Form.Label> */}
                                                    <Form.Floating className="mb-3">
                                                            <Form.Control
                                                                required
                                                                type="text"
                                                                placeholder="Informe o Email"
                                                                onChange={e => setEmail(e.target.value)}
                                                                defaultValue={email}
                                                            />
                                                            <label htmlFor="floatingInputCustom">Email</label>
                                                            <Form.Control.Feedback type="invalid">Informe o Email</Form.Control.Feedback>
                                                    </Form.Floating>
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Form.Group>
                                          </Row>  
                                          <Row className="mb-3">
                                                <Form.Group as={Col} md="5" xs="11" controlId="validation02">
                                                    {/* <Form.Label>First name</Form.Label> */}
                                                    <Form.Floating className="mb-3">
                                                            <Form.Control
                                                                required
                                                                type={typesenha}
                                                                placeholder="Informe o Email"
                                                                onChange={e => setSenha(e.target.value)}
                                                                defaultValue={senha}
                                                            />
                                                            <label htmlFor="floatingInputCustom">Senha</label>
                                                            <Form.Control.Feedback type="invalid">Informe a Senha</Form.Control.Feedback>
                                                    </Form.Floating>
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} xs="1" md="1 d-flex float-start align-items-center" controlId="validation02">
                                                    <FontAwesomeIcon id="id_type"className="pointer" onClick={exibeSenha} icon={icontypesenha} />
                                                </Form.Group>
                                                <Form.Group as={Col} md="5" xs="11" controlId="validation02">
                                                    {/* <Form.Label>First name</Form.Label> */}
                                                    <Form.Floating className="mb-3">
                                                            <Form.Control
                                                                required
                                                                type={retypesenha}
                                                                placeholder="Informe o Email"
                                                                onChange={e => setRetypesenha(e.target.value)}
                                                                defaultValue={retypesenha}
                                                            />
                                                            <label htmlFor="floatingInputCustom">Confirme a senha</label>
                                                            <Form.Control.Feedback type="invalid">Informe a Confirmação a senha</Form.Control.Feedback>
                                                    </Form.Floating>
                                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                                </Form.Group>
                                                <Form.Group as={Col} xs="1" md="1 1 d-flex float-start align-items-center" controlId="validation02">
                                                    <FontAwesomeIcon id="id_type"className="pointer" onClick={exibeRetypeSenha} icon={iconretypesenha} />
                                                </Form.Group>
                                          </Row>
                                          <Row>
                                             <Col md={12} className="text-center">
                                                 <Button type="submit" onClick={handleSubmit}>
                                                    <SpinnerComp mostra={mostraspinner}/>{' '} Enviar
                                                 </Button>
                                             </Col>
                                          </Row>     
                                      </Form>  
                                    </div>
                                    {/* <div class="card-body">
                                        <form>
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <input class="form-control" id="inputFirstName" type="text" placeholder="Enter your first name" />
                                                        <label for="inputFirstName">First name</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-floating">
                                                        <input class="form-control" id="inputLastName" type="text" placeholder="Enter your last name" />
                                                        <label for="inputLastName">Last name</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-floating mb-3">
                                                <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" />
                                                <label for="inputEmail">Email address</label>
                                            </div>
                                            <div class="row mb-3">
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <input class="form-control" id="inputPassword" type="password" placeholder="Create a password" />
                                                        <label for="inputPassword">Password</label>
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-floating mb-3 mb-md-0">
                                                        <input class="form-control" id="inputPasswordConfirm" type="password" placeholder="Confirm password" />
                                                        <label for="inputPasswordConfirm">Confirm Password</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-4 mb-0">
                                                <div class="d-grid"><a class="btn btn-primary btn-block" href="login.html">Create Account</a></div>
                                            </div>
                                        </form>
                                    </div> */}

                                    <div class="card-footer text-center py-3">
                                        <div class="small"><a href="/">Have an account? Go to login</a></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
                <footer class="py-4 bg-light mt-auto">
                    <div class="container-fluid px-4">
                        <div class="d-flex align-items-center justify-content-between small">
                            <div class="text-muted">Copyright &copy; Your Website 2023</div>
                            <div>
                                <a href="#">Privacy Policy</a>
                                &middot;
                                <a href="#">Terms &amp; Conditions</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
   </div>
   <ToastComp 
        position={position}
        show={showtoast} 
        texto={msgtoast}
        fechaToast={fechaToast}
        fundo={fundo}
        delay={delay_toast}
        tipo_erro = {strtypeerro}
        lista={handleLogin}
        refresh={refresh_toast} // define se da um refresh de pagina  
    />
    </>
);
}

export default Register
