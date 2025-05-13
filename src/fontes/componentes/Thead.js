import React, {useState,useEffect} from "react";
//import Tbdados from "../dados/dados01";


function Head(props){
  const [header,Setheader] = useState(props.colunas);    
   //const noPointer = {cursor: 'crosshair'}; //<th style={noPointer}>{head.nome}</th>
  const noPointer = {cursor: 'crosshair',color: 'blue !important'};
    return(
       <>
         {header.map( (item,i) => 
             <th key={i}>{item.nome}</th>
          )} 
      </>    
   ) 
}

// function The(props){
//     return(
//        <>
//        <thead>
//         <Head colunas={props.colunas}/>
//          {/* <th>{props.valor.name}</th>
//          <th>{props.valor.position}</th>
//          <th>{props.valor.office}</th>
//          <th>{props.valor.age}</th>
//          <th>{props.valor.start_date}</th>
//          <th>{props.valor.salary}</th> */}
//        </thead>
//        </>
//     );
//  }    
 
export default Head;
