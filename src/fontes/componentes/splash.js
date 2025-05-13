import Spinner from 'react-bootstrap/Spinner';

function Splash(props){
    const panel_inside = {
                          position:'absolute',
                          left:'50%',
                          top:'50%',
                          width:'320px',
                          height:'110px',
                          fontWeight:'bold',
                          color:'#303f9f',
                          marginTop: '-50px',
                          marginLeft: '-50px',
                          backgroundColor:' #dbe8ea',
                          borderRadius: '8px',
                          zIndex:'10'
                         };
    return (
          <>
          <div className={props.classe} style={panel_inside}>
                <center>{!!(props.texto) ? props.texto : 'Aguarde Processando'}</center>
                <br></br>
                <center>
                   <Spinner animation="grow" variant="primary" />
                   <Spinner animation="grow" variant="primary" />
                   {/* <div className="spinner-border text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                   </div> */}
                </center>
          </div>
          </> 
       )      
 }

 export default Splash;