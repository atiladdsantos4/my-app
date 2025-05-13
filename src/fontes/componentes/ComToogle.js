import React, { useState } from 'react';
import { faList,faEdit,faTrash,faToggleOn,faToggleOff} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function ComToogle(props) {
  const [isFilled, setIsFilled] = useState(props.acao);
  const {funcao} = props; //--> A (passado como props)
  const handleClick = () => {
    setIsFilled(!isFilled);//altera o icone pra status off
    funcao(); // A --> função que chama o ajax via axios para atualzizar o cliente
  };

  return (
    <div onClick={handleClick}>
      {isFilled ? <FontAwesomeIcon size="xl" className="pointer color_label" icon={faToggleOn} /> : <FontAwesomeIcon size="xl" className="pointer color_label" icon={faToggleOff} />}
    </div>
  );
}

export default ComToogle;