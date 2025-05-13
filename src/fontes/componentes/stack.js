import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
function StackHeader(props){
    
    const {funcButton} = props;//state var controlada pelo parent

    const handleExibe = () => {
        funcButton();
    };
    
    return(
        <Stack direction="horizontal" gap={3}>
            <div className="p-2"></div>
            <div className="p-2 ms-auto"></div>
            <div className="p-2"><Button variant="primary" type="button" onClick={handleExibe}>{props.textoButton}</Button></div>
        </Stack>
    ); 
}

export default StackHeader; 