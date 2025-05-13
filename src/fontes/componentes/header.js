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
        </head>
        <h1>asdsds</h1>
      </>  
   );    
}

export default Header;