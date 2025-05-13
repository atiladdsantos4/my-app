import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import ConfGlobal from './../../config.js';
import { createBrowserHistory } from 'history';
import { useNavigate, useParams, useLocation   } from "react-router-dom";
import Splash from "../componentes/splash.js"; 
const appserver = ConfGlobal.endpoint.url;



function Produto(props){
    const location = useLocation();
    const myParam = location.state?.Title;
    console.log('pararaa');
    console.log(myParam);
    const [Title,setTitle] = useState(props.title); 
    const [titleheader,setTitleheader] = useState("Produto"); 
    const [titlesubheader,setTitlesubheader] = useState("Cadastro de Produtos"); 
    const [titlebtacao,setTitlebtacao] = useState("Create Product"); 
    const [senha,setSenha] = useState('');
    const [typesenha,setTypesenha] = useState('password');
    const [icontypesenha,setIcontypesenha] = useState(faEyeSlash);
    const [retypesenha,setRetypesenha] = useState('password');
    const [iconretypesenha,setIconretypesenha] = useState(faEyeSlash);
    const [splashclasse,setSplashclasse] = useState('esconde');
    const [splashtexto,setSplashtexto] = useState('Aguarde Salvando as Informações');
    const [idProd,setIdProd] = useState('');
    const [name,setName] = useState('');
    const [detail,setDetail] = useState('');
    const [action,setAction] = useState('insert');
    const [colorlabel,setColorlabel] = useState('color_label');
    const navigate = useNavigate();
    
    const  { id }  = useParams();
   
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
        if( retypesenha == 'password' ){
            setIconretypesenha(faEye);     
        } else {
            setIconretypesenha(faEyeSlash);      
        }
        setRetypesenha(retypesenha == 'password' ? 'text' : 'password');   
        return;    
    };

    const ListaProdutos = event => {
        navigate('/tabela');
        navigate(0)
    }

    const handleSubmit = event => {

        event.preventDefault();
      
        
        if( action == 'insert'){
            setSplashclasse('exibe');
            axios.post(`${appserver}/product`,{name,detail},{
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                }
            })
                .then((result) => {
                setSplashclasse('esconde');
                navigate('/tabela');
                navigate(0)
            });

        }
        
        if( action == 'edit'){
            setSplashtexto('Aguarde Atulizando Produto...');
            setSplashclasse('exibe');
            axios.put(`${appserver}/product/${id}`,{name,detail},{
                headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer 3|N0bD2tUQbSBGWtWh6LGR7h3ohUni87IwvYBb3KRi3a6748f9'
                }
            })
                .then((result) => {
                setSplashclasse('esconde');
                navigate('/tabela');
                navigate(0)
            });
            
        }

    }

    //ediçao//
    useEffect(() => {
        //return;
        if( typeof myParam != "undefined"){
            setTitle(myParam); 
            setTitlebtacao("Edit Product"); 
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
                setIdProd(result.data.data.id);    
                setName(result.data.data.name);
                setDetail(result.data.data.detail);
                setAction('edit');
                setSplashclasse('esconde');
            //setLoading(false);
            });
        } else {
            console.log('sem parametros');
        }
        
     },[]); //executa apenas uma vez
  

    return(
     <>
     <Splash classe={splashclasse}  texto={splashtexto}/>
     <div class="container-fluid px-4">
           <h1 class="mt-4">{titleheader}</h1>
           <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">{titlesubheader}</li>
           </ol>
     <div class="card mb-4">
        <div class="card-header">
                <i class="fa-solid fa-barcode"></i>                
                { Title }
            </div>
            <div class="card-body">  
                <form>
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <div class="form-floating mb-3 mb-md-0">
                                <input class="form-control" id="name" name="name" type="text" 
                                       onChange={e => setName(e.target.value)} 
                                       value={name}
                                       placeholder="Informe o Nome do Produto" />
                                <label for="name" className={colorlabel}>Nome do Produto</label>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-floating">
                                <input class="form-control" id="detail"name="detail"  type="text" 
                                onChange={e => setDetail(e.target.value)} 
                                value={detail}
                                placeholder="Informe o Detalhes do Produto" />
                                <label for="inputLastName" className={colorlabel}>Detalhes do Produto</label>
                            </div>
                        </div>
                    </div>
                    <div class="mt-4 mb-0">
                        <div class="row">
                            <div class="col-md-2">
                                <button class="btn btn-primary" type="button" onClick={handleSubmit}>{titlebtacao}</button>
                            </div>
                            <div class="col-md-2">
                                <button class="btn btn-warning" type="button" onClick={ListaProdutos}>List Products</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>     
            {/* <TableCustom id="datatablesSimple" title="DataTable Custom Example (React Componente)" colunas={props.colunas}/> */}
        </div>
     </div>   
    </>
   );
}
export default Produto;