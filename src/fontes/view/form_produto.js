import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';

function FormExemplo(props) {
  const [Title,setTitle] = useState(props.title); 
  const [titleheader,setTitleheader] = useState("Formulários"); 
  const [titlesubheader,setTitlesubheader] = useState("Formulários com Validação (Bootstrap front-end"); 
  const [titlebtacao,setTitlebtacao] = useState("Create Product");   
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <div class="container-fluid px-4">
        <h1 class="mt-4">{titleheader}</h1>
        <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item active">{titlesubheader}</li>
        </ol>
<div class="card mb-4">
 <div class="card-header">
         <i class="fa-solid fa-barcode"></i>                
         { Title }
     </div>
     <div class="card-body">  
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
               <Row className="mb-3">
                 <Form.Group as={Col} md="4" controlId="validationCustom01">
                   {/* <Form.Label>First name</Form.Label> */}
                   <Form.Floating className="mb-3">
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue="Mark"
                            
                        />
                        <label htmlFor="floatingInputCustom">First Name</label>
                   </Form.Floating>
                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                 </Form.Group>
                 <Form.Group as={Col} md="4" controlId="validationCustom02">
                   <Form.Label>Last name</Form.Label>
                   <Form.Control
                     required
                     type="text"
                     placeholder="Last name"
                     defaultValue="Otto"
                   />
                   <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                 </Form.Group>
                 <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                   <Form.Label>Username</Form.Label>
                   <InputGroup hasValidation>
                     <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                     <Form.Control
                       type="text"
                       placeholder="Username"
                       aria-describedby="inputGroupPrepend"
                       required
                     />
                     <Form.Control.Feedback type="invalid">
                       Please choose a username.
                     </Form.Control.Feedback>
                   </InputGroup>
                 </Form.Group>
               </Row>
               <Row className="mb-3">
                 <Form.Group as={Col} md="6" controlId="validationCustom03">
                   <Form.Label>City</Form.Label>
                   <Form.Control type="text" placeholder="City" required />
                   <Form.Control.Feedback type="invalid">
                     Please provide a valid city.
                   </Form.Control.Feedback>
                 </Form.Group>
                 <Form.Group as={Col} md="3" controlId="validationCustom04">
                   <Form.Label>State</Form.Label>
                   <Form.Control type="text" placeholder="State" required />
                   <Form.Control.Feedback type="invalid">
                     Please provide a valid state.
                   </Form.Control.Feedback>
                 </Form.Group>
                 <Form.Group as={Col} md="3" controlId="validationCustom05">
                   <Form.Label>Zip</Form.Label>
                   <Form.Control type="text" placeholder="Zip" required />
                   <Form.Control.Feedback type="invalid">
                     Please provide a valid zip.
                   </Form.Control.Feedback>
                 </Form.Group>
               </Row>
               <Form.Group className="mb-3">
                 <Form.Check
                   required
                   label="Agree to terms and conditions"
                   feedback="You must agree before submitting."
                   feedbackType="invalid"
                 />
               </Form.Group>
               <Button type="submit">Submit form</Button>
          </Form>
     </div>     
     {/* <TableCustom id="datatablesSimple" title="DataTable Custom Example (React Componente)" colunas={props.colunas}/> */}
 </div>
</div>
  );
}

export default FormExemplo;