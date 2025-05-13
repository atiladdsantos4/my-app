
function Meta(props){
    return (
        <meta charset={props.charset}></meta>
    );    
}

function Header(){
    return (
        <>
          <head>
             <Meta charset="utf-8"/>
             <Meta http-equiv="utf-8"/>
          </head>
       </>
    );    
}

export default Meta;