import React, {useState, useEffect} from "react";
import Spinner from 'react-bootstrap/Spinner';
/*
        as="span"
        animation="border" //--> border,grow
        size="sm" 
        role="status"
        aria-hidden="true"
        variant = "light" 
*/

function SpinnerComp(props){
   const [mostra,setMostra] = useState('exibe_in'); 
   
   return (
    <>
    <span className={props.mostra}>
    <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        variant="light"
    />
    </span>
    </>
   ); 
} 

export default SpinnerComp;