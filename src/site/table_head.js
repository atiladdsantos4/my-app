import React, {useState} from "react";
import Tbdados from "../fontes/dados/dados01";

function TableHeader(props){
   const [col,setcol] = useState(props.colunas)
//    const colunas =[
//        "Name",
//        "Position",
//        "Office",
//        "Age",
//        "Start date",
//        "Salary"
//    ]; 
   return(
    <>
    <thead>
        <tr>
          {col.map( (item,index) => <th key={index}>{item}</th>)}
        </tr>
    </thead>
    <tfoot>
        <tr>
          {col.map( (item,index) => <th key={index}>{item}</th>)}
        </tr>
    </tfoot>
    </>
   )  
}

function Linha(props){
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
 
 function Registro(){
   const [dados,setdados] = useState(Tbdados);    
     return(
        <>
          {dados.map( (dados,index) => <tr key={index}><Linha valor={dados} /></tr>)} 
       </>    
    ) 
 }
 
function TableBody(){
    return(
        <>
        <tbody>
            <Registro/>
            {/* <tr>
                <td>Tiger Nixon</td>
                <td>System Architect</td>
                <td>Edinburgh</td>
                <td>61</td>
                <td>2011/04/25</td>
                <td>$320,800</td>
            </tr>
            <tr>
                <td>Garrett Winters</td>
                <td>Accountant</td>
                <td>Tokyo</td>
                <td>63</td>
                <td>2011/07/25</td>
                <td>$170,750</td>
            </tr>
            <tr>
                <td>Ashton Cox</td>
                <td>Junior Technical Author</td>
                <td>San Francisco</td>
                <td>66</td>
                <td>2009/01/12</td>
                <td>$86,000</td>
            </tr> */}
        </tbody>
        </>
    )  
}
 
export {TableHeader,TableBody} 