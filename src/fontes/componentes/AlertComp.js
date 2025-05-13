/* Usage:
   <AlertComp 
     status={statusAlert}      //-->Controla o ste show do alert bollean: true/false
     message={textAlert}       //-->Controla mensagen de texto do Alert tipos("texto'->mensagem simples / array-> validation erros)
     color={colorAlert}        //-->Controla a cor do fundo so alert( bootstrap standart colors: primary,danger,etc)  
     tipo={typeAlert}          //--> separa o icone de wanring e outros 
     tipo_erro = {strtypeerro} //--> texto simples ou array (mensagens do backend validator) 
    />
*/
import Alert from 'react-bootstrap/Alert';
import { faTriangleExclamation,faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AlertComp(props){
    
    const {funcFechar} = props;//state var controlada pelo parent

    // const handleExibe = () => {
    //     funcButton();
    // };

    // const handeShow = () => {
    //     console.log('fecha o alerta');
    //     //funcFechar();
    // };

    const RespostaArray = () =>{ //cria componete tipo <ul></ul>
        console.log('RespostaArray');
        let vetor = props.message 
        return (
          <>
          <ul>
             {vetor.map((item) => <li className="fonte_size">{item}</li>)}
          </ul>
          </>
         )
         
      } 
  
    const Resposta = () =>{ //cria componete tipo <span></span>
        console.log('Resposta');
        let fundo =  props.fundo == 'success' ? 'white' : 'black'; //altera a cor da fonte//
        return (
          <>
          <span style={{color:fundo}}>{props.message}</span>
          </>
        )  
      }
    
    return(
        <Alert show={props.status} variant={props.color}>
          { props.tipo ==='warning' ? <FontAwesomeIcon size="xl" className="color_red"  icon={faTriangleExclamation} /> :  <FontAwesomeIcon size="xl" className="color_green"  icon={faCheck} />}
          {'  '}
          { props.tipo_erro == 'texto' ? <Resposta/> : <RespostaArray />}
        </Alert>
    ); 
}

export default AlertComp; 