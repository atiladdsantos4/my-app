//import React from 'react';
import ReactDOM from 'react-dom/client';
import React, {useState} from "react";
import './index.css';
import App from './App';
import { myHello, myTable, myDiv } from './fontes/exports';
import { Car, Onibus, Garage } from './fontes/componentes/comp_function'
import Header from './fontes/componentes/header'
import { Topbar, Footer } from './fontes/componentes/content'
import Sidebar from './fontes/componentes/sidebar'
import Sdbar from './fontes/componentes/sdbar'
import Navbar from './fontes/componentes/navbar'
import reportWebVitals from './reportWebVitals';



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


const root = ReactDOM.createRoot(document.getElementById('root'));
//root.render( <Onibus color="red"/>); //--> pega da importação do elemento com props<--//
//root.render( <Car /> ); //--> pega da importação do elemento sem props <--//  
root.render( <Carro /> ); //--> pega a funcao do escopo <--//
//root.render( <Content classe="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"/> ); //--> componente dentro de outro componete <--//
// <React.StrictMode>
  //   <App />
  // </React.StrictMode>

reportWebVitals();
