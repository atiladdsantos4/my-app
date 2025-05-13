
import React, {useState, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import ConfGlobal from './../../config.js';
import { useNavigate, useParams, useLocation   } from "react-router-dom";
import Splash from "../componentes/splash.js"; 
import ToastComp from "./toast.js";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import SpinnerComp from "./spinners.js";
import Cookies from 'js-cookie';
//import Toast from "./toast.js";



function Login(){

    //Cookies.set('_token', '3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9',{ path: '/' });
    console.log(Cookies.get('_token'));
    // Cookies.remove('_token',{ path: '/' })
    // Cookies.remove('meu_cookie',{ path: '/' })
    
    //navegação de url
    const navigate = useNavigate();
    
    //conf com end point ou outras condiconais 
    const appserver = ConfGlobal.endpoint.url;
    
    //campos do fomulários(form)
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    //cor do label flutuante
    const [colorlabel,setColorlabel] = useState('color_login');
    
    //validação do form//
    const [validated, setValidated] = useState(false);
    
    //exibição de senha//
    const [senha,setSenha] = useState('');
    const [typesenha,setTypesenha] = useState('password');
    const [icontypesenha,setIcontypesenha] = useState(faEyeSlash);
    
    //Variáveis de inicialização do Toast Componente 
    const [msgtoast,setMsgtoast] = useState('Login Inválido');
    const [cor,setCor] = useState('danger');
    const [position,setPosition] = useState('bottom-end');
    const [showtoast, setShowtoast] = useState(false);
    const toggleShowToast = () => setShowtoast(!showtoast);
    const [strtypeerro, setStrtypeerro] = useState('texto');

    //spinner//
    const [mostraspinner,setMostraspinner] = useState('esconde');

    const [showB, setShowB] = useState(true);
    const [showA, setShowA] = useState(true);
    
      
    const toggleShowA = () => setShowA(!showA);
    const toggleShowB = () => setShowB(!showB);
    
    const handleSubmit = event => {//submit teh form//

      event.preventDefault();
      
        
            //setSplashclasse('exibe');
            setMostraspinner('exibe_in');
            axios.post(`${appserver}/login`,{email,password},{
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                }
            })
            .then((result) => {
                console.log('entrei_no_resut');    
                console.log(result.data);    
                setMostraspinner('esconde');
                if(result.data.status == false){
                    setStrtypeerro('texto');
                    setMsgtoast(result.data.message);
                    setShowtoast(!showtoast);
                    //setShowB(!showB);  
                    
                } else {
                   console.log(result.data);
                   let getToken = Cookies.get('_token');
                   alert(getToken);
                   if( getToken === undefined || getToken ===''){
                       Cookies.set('user', result.data.username,{ path: '/' });
                       Cookies.set('email', result.data.mail,{ path: '/' });
                       Cookies.set('_token', result.data.token,{ path: '/' });
                   } else {
                      let verifica = getToken.split('|');
                      //if( result.data.id !== verifica[0]){
                        Cookies.set('user', result.data.username,{ path: '/' });
                        Cookies.set('email', result.data.mail,{ path: '/' });
                        Cookies.set('_token', result.data.token,{ path: '/' });
                      //}  
                   }       
                   navigate('/main');
                   navigate(0)  
                   return;
                }
            })
            .catch(function (error) {
                // console.log('entrei_no_error');    
                // console.log(error);
                setMostraspinner('esconde');
                 let erro =  error.response.data.errors;
                 let erros = [];
                 for (const property in erro) {
                     erros.push(`${property}: ${erro[property]}`);
                 }    
                 setStrtypeerro('texto');
                 setMsgtoast('error');
                 setShowtoast(!showtoast);
                alert(error);
            });
 
   }    

  const fechaToast = (newState) => {
    setShowtoast(false);
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
 
  document.getElementsByTagName("body")[0].className = "bg-primary"; //--> define o fundo azul <--//
  
  return(
   <>  
   <Button onClick={toggleShowToast} className="mb-2">
       Toggle Toast <strong>without</strong> Animation
   </Button>
   
   <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header">
                                    <h3 className="text-center font-weight-light my-4">
                                        <FontAwesomeIcon size="xl" className="pointer color_login" icon={faCircleUser} /> Login
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <form>
                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="email" type="email" onChange={e => setEmail(e.target.value)} placeholder="name@example.com" />
                                            <label className={colorlabel} htmlFor="email">Email address</label>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-11 col-11">   
                                                <div className="form-floating mb-3">
                                                    <input className="form-control" id="password" type={typesenha} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                                    <label className={colorlabel} htmlFor="inputPassword">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-md-1 col-1 d-flex float-start align-items-center">
                                                <FontAwesomeIcon id="id_type"className="pointer" onClick={exibeSenha} icon={icontypesenha} />
                                            </div> 
                                        </div>    
                                         <div className="form-check mb-3">
                                                    <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                                    <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                            <a className="small" href="password.html">Forgot Password?</a>
                                            <a className="btn btn-primary" onClick={handleSubmit} href="#">
                                                <SpinnerComp mostra={mostraspinner}/>{' '}
                                                Login
                                            </a>
                                        </div>
                                    </form>
                                </div>
                                <div className="card-footer text-center py-3">
                                    <div className="small"><a href="/authentication/register">Need an account? Sign up!</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
                <div className="container-fluid px-4">
                    <div className="d-flex align-items-center justify-content-between small">
                        <div className="text-muted">Copyright &copy; Your Website 2023</div>
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
       fundo="danger"
       delay="3000"
       tipo_erro = {strtypeerro}
       refresh={false} // define se da um refresh de pagina  
    />
    </>
);
}

export default Login
