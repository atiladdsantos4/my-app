import React, {useState, useEffect} from "react";
import Toast from 'react-bootstrap/Toast';

function ToastExample(props) {

    const [mostra, setMostra] = useState(true);
    const {toggleShowB,showA} = props;

    const handleClose = () => {
        setMostra(false);
    };

    return (
      <Toast bg={props.fundo} show={mostra} animation={true} delay={3000} autohide onClose={handleClose}> 
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{props.texto}</Toast.Body>
      </Toast>
    );
  }
  
  export default ToastExample;
