import React, {useState, useEffect} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function ModalWindow(props) {

    const [mostra, setMostra] = useState(true);
    const {fecharModal,deletarReg} = props;//state var controlada pelo parent

    const handleClose = () => {
      //fechaModal(false);
      fecharModal(false);
    };

    const Delete = () => {
        //fechaModal(false);
        deletarReg();
    };

    return (
      <>
     <Modal show={props.exibe} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <FontAwesomeIcon size="xl" className="pointer color_red"  icon={faTriangleExclamation} />{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.titlebody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button id={props.id} variant="danger" onClick={Delete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      </>
    );
  }
  
  export default ModalWindow;
