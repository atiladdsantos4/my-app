    
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function ButtonGrid(props) {

    const {click} = props;// state var controlada pelo parent, lista é a listagem que sera renderizado, 
    // após o fechamento o toast

    const handleClick = () => {
        click()
    } 

    return (
        <Row>
            <Col className="text-end" style={{paddingTop: '12px',marginRight:'13px'}}>
                <Button variant="primary" type="button" onClick={handleClick}>
                <FontAwesomeIcon size="xl" className="pointer color_login" icon={props.icon} />
                {' '} 
                {props.textoButton}
                </Button>
            </Col>
        </Row>
    );
}