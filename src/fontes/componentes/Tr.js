import React, {useState,UserEffect} from "react";
import Tbdados from "../dados/dados01";

function Td(props){
   return(
      <>
      <td>{props.valor.name}</td>
      <td>{props.valor.position}</td>
      <td>{props.valor.office}</td>
      <td>{props.valor.age}</td>
      <td>{props.valor.start_date}</td>
      <td>{props.valor.salary}</td>
      </>
   );
}    

function Linha(){
  const [dados,Setdados] = useState(Tbdados);    
    return(
       <>
         {dados.map( (dados) => <tr><Td valor={dados} /></tr>)} 
      </>    
   ) 
}

export default Linha;