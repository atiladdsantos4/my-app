import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faEyeSlash,faEye } from '@fortawesome/free-solid-svg-icons'

function Produto(props){
    const [Title,setTitle] = useState(props.title);
    const [senha,setSenha] = useState('');
    const [typesenha,setTypesenha] = useState('password');
    const [icontypesenha,setIcontypesenha] = useState(faEyeSlash);
    const [retypesenha,setRetypesenha] = useState('password');
    const [iconretypesenha,setIconretypesenha] = useState(faEyeSlash);

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

    function verIcon(event){
       alert(retypesenha); 
    }

    return(
     <>
     <div class="container-fluid px-4">
           <h1 class="mt-4">{Title}</h1>
           <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item active">{Title}</li>
           </ol>
     <div class="card mb-4">
        <div class="card-header">
                <i class="fa-solid fa-barcode"></i>                
                { props.title }
            </div>
            <div class="card-body">  
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
                        <div class="col-md-5">
                            <div class="form-floating mb-3 mb-md-0">
                                <input class="form-control" id="inputPassword" type={typesenha} placeholder="Create a password" />
                                <label for="inputPassword">Password</label>
                            </div>
                        </div>
                        <div class="col-md-1 d-flex align-items-center">
                            {/* <FontAwesomeIcon id="teste" icon={['fab', 'apple']} /> */}
                            <FontAwesomeIcon id="id_type" onClick={exibeSenha} icon={icontypesenha} />
                            {/* <FontAwesomeIcon id="teste" icon={faEye} /> */}
                            
                        </div>
                        <div class="col-md-5">
                            <div class="form-floating mb-3 mb-md-0">
                                <input class="form-control" id="inputPasswordConfirm" type={retypesenha} placeholder="Confirm password" />
                                <label for="inputPasswordConfirm">Confirm Password</label>
                            </div>
                        </div>
                        <div class="col-md-1 d-flex align-items-center">
                            <FontAwesomeIcon id="id_retype" onClick={exibeRetypeSenha} icon={iconretypesenha} />
                        </div>
                    </div>
                    <div class="mt-4 mb-0">
                        <div class="d-grid"><a class="btn btn-primary" href="login.html">Create Account</a></div>
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