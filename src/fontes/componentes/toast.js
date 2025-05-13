import React, {useState, useEffect} from "react";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useNavigate  } from "react-router-dom";

function ToastComp(props) {

    const navigate = useNavigate();
    const [mostra, setMostra] = useState(true);
    const {fechaToast, lista} = props;// state var controlada pelo parent, lista é a listagem que sera renderizado, 
                                      // após o fechamento o toast

    const handleClose = () => {
       fechaToast(false);
       if(props.refresh){ //Se definida "true" atualiza a pagina atual
          lista(); 
          //navigate(0);
       } 
    };
    
    const RespostaArray = () =>{
      console.log('RespostaArray');
      let vetor = props.texto 
      return (
        <>
        <ul>
           {vetor.map((item) => <li>{item}</li>)}
        </ul>
        </>
       )
       
    } 

    const Resposta = () =>{
      console.log('Resposta');
      let fundo =  props.fundo == 'success' ? 'white' : 'black';
      return (
        <>
        <span style={{color:fundo}}>{props.texto}</span>
        </>
      )  
    }
    
    return (
      <>
      <ToastContainer
          className="p-3"
          position={props.position}
          style={{ zIndex: 1 }}
      >
          <Toast bg={props.fundo} show={props.show} animation={true} delay={props.delay} autohide onClose={handleClose}> 
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
              <strong className="me-auto">Mensagem Sistema</strong>
              <small>1 mins ago</small>
            </Toast.Header>
            <Toast.Body>
                { props.tipo_erro == 'texto' ? <Resposta/> : <RespostaArray />}
            </Toast.Body>
          </Toast>
      </ToastContainer>
      </>
    );
  }
  
  export default ToastComp;
