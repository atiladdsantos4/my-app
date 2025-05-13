import Placeholder from 'react-bootstrap/Placeholder';
function PlaceholderComp(props){
    
    const {funcButton} = props;//state var controlada pelo parent

    const handleExibe = () => {
        funcButton();
    };

    /*
    const handleSimple = () => {
        return (
           <Placeholder xs={12} bg="secondary" style={{height:'56px',borderRadius:'5px',paddingTop:'5px'}}/>
        )
    };

    const handleComplex = () => {
        return (
           <Placeholder as="p" animation="wave">
             <Placeholder xs={12} bg="secondary" style={{height:'56px',borderRadius:'5px',paddingTop:'5px'}}/>
          </Placeholder>
        )
    };
    tag="p" animation="wave" bg="" size="2" style={{top:'10px',height:'45px',borderRadius:'5px',paddingTop:'5px'}}
    */

    return(
        <Placeholder as={props.tag} animation={props.animation}>
            <Placeholder xs={props.size} bg={props.bg} style={props.estilo}/>
        </Placeholder>
    )  
}

export default PlaceholderComp; 