//import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useState} from "react";
import './index.css';
import App from './App';
import { myHello, myTable, myDiv } from './fontes/exports';
import { Car, Onibus, Garage } from './fontes/componentes/comp_function'
import Header from './fontes/componentes/header'
import { Topbar, Footer } from './fontes/componentes/content'
import Sidebar from './fontes/componentes/sidebar'
import SdbarMain from './fontes/componentes/SdbarMain';
import SdbarIndex from './fontes/componentes/SdbarIndex';
import Sdbar from './fontes/componentes/sdbar'
import Navsidebar from './site/site_navbar';
//import Navbar from './fontes/componentes/navbar'
import Ulnavbar from  './fontes/componentes/ulnavbar'
import Geral from './fontes/componentes/geral';
import Grafico from './fontes/componentes/grafico';
import Login from './fontes/componentes/login';
import Register from './fontes/componentes/Register';
import Forgot from './fontes/componentes/Forgot';
import Page401 from './fontes/componentes/Page401';
import Page404 from './fontes/componentes/Page404';
import Page500 from './fontes/componentes/Page500';
import ExibirGrafico from './fontes/componentes/ExibirGrafico';
import ExibirTabelas from './fontes/componentes/ExibirTabelas';
import reportWebVitals from './reportWebVitals';

/* novo */ 
import Navbar from './site/site_navbar';
import { createBrowserHistory } from "history";


function Carro(){
  return <h1>Função Carro</h1>
} //-->dentro do escopo não precisa de export default

function Content(props){
  const [mudaSide, setmudaSide] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const { onClick, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);

  const mudaClasse = () => {
    setmudaSide("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toogled");
  };

  return(
    <>
     <Navbar/>
     <Sdbar/>
    </>    
  );
}

function ContentNovo(props){
  const [mudaSide, setmudaSide] = useState("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion");
  const { onClick, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const [view, setview] = React.useState(props.view);

  const mudaClasse = () => {
    setmudaSide("navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toogled");
  };

  const visao  = () => {
    switch(view){
       case 'main':
          return <SdbarMain view=""/>;  
       case 'tabelas':
          return <SdbarMain view="tabelas"/>;  
          // return <Sdbar/>;  
      case 'graficos':
         return <SdbarMain view="graficos"/>;     
      case 'cards':
          return <SdbarMain view="cards"/>;        
      case 'charts_geral':
          return <SdbarMain view="charts_geral"/>;         
      case 'tabelas_geral':
          return <SdbarMain view="tabelas_geral"/>;             
      case 'novo_produto':
          return <SdbarMain view="novo_produto"/>;                 
      case 'form_produto':
          return <SdbarMain view="form_produto"/>;    
      case 'lista_produto':
          return <SdbarMain view="lista_produto"/>;    
      case 'form_cliente':
            return <SdbarMain view="form_cliente"/>;    
      case 'lista_cliente':
            return <SdbarMain view="lista_cliente"/>;        
      case 'custom':
            return <SdbarMain view="custom"/>;        
              
                 
      default:
        //return <SdbarIndex/>;   
      break;
    } 
 };
  return(
    <>
     <Navbar/>
     {visao()}
     {/* if(props.view =="main"){
       <SdbarMain/>         
     }
     if(props.view =="tabela"){ 
       <Sdbar/> 
     }  */}
    </>    
  );
}  

  /*
  
  <Grafico id={props.id}/>
  return(
   <>
     <div id="wrapper">
        <Sidebar classe={props.classe}/>
        <div id="content-wrapper" class="d-flex flex-column">
           <div id="content">
             <Topbar/>
           </div>
           <Footer/>
        </div>
     </div>
   </>    
  );

const myFirstElement = <h1>Hello React!</h1>
const myTable = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <td>John</td>
    </tr>
    <tr>
      <td>Elsa</td>
    </tr>
  </table>
);
*/
const hist = createBrowserHistory();
const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render( <Onibus color="red"/>); //--> pega da importação do elemento com props<--//
//root.render( <Car /> ); //--> pega da importação do elemento sem props <--//  
root.render( 
   <BrowserRouter>
      <Routes>  
          <Route path='/' element={<Login/>}/> 
          <Route path='/main' element={<ContentNovo view="main"/>}/> 
          <Route exact path='/tabela' element={<ContentNovo view="tabelas"/>}/> 
          <Route path='/charts' element={<ContentNovo view="graficos"/>}/> 
          <Route path='/cards' element={<ContentNovo view="cards"/>}/> 
          <Route path='/authentication/login' element={<Login/>}/> 
          <Route path='/authentication/register' element={<Register/>}/> 
          <Route path='/authentication/password' element={<Forgot/>}/> 
          <Route path='/pages/page401' element={<Page401/>}/> 
          <Route path='/pages/page404' element={<Page404/>}/> 
          <Route path='/pages/page500' element={<Page500/>}/> 
          <Route path='/custom' element={<ContentNovo view="custom"/>}/> 
          {/* <Route path='/charts/graficos' element={<ExibirGrafico/>}/>  */}
          <Route path='/charts/graficos' element={<ContentNovo view="charts_geral"/>}/> 
          <Route path='/tables/tabelas' element={<ContentNovo view="tabelas_geral"/>}/> 
          <Route exact path='/cadastros/produto' element={<ContentNovo view="novo_produto"/>}/> 
          <Route path='/cadastros/produto/:id' element={<ContentNovo view="novo_produto"/>}/> 
          <Route path='/cadastros/form/produto' element={<ContentNovo view="form_produto"/>}/> 
          <Route path='/cadastros/form/produto/:id' element={<ContentNovo view="form_produto"/>}/>
          <Route path='/cadastros/listar/produto' element={<ContentNovo view="lista_produto"/>}/>  
          <Route path='/cadastros/form/cliente' element={<ContentNovo view="form_cliente"/>}/> 
          <Route path='/cadastros/form/cliente/:id' element={<ContentNovo view="form_cliente"/>}/>
          <Route path='/cadastros/listar/cliente' element={<ContentNovo view="lista_cliente"/>}/>  
          {/* <Route path='/tables/tabelas' element={<ExibirTabelas/>}/>  */}
          <Route path="*" element={<Page404/>} />
      </Routes>
   </BrowserRouter>
); //--> pega a funcao do escopo <--//
//root.render( <Content classe="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"/> ); //--> componente dentro de outro componete <--//
// <React.StrictMode>
  //   <App />
  // </React.StrictMode>

reportWebVitals();
