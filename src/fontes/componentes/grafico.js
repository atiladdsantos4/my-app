/* Hook para renderizaçõa de Gráfico
   parametros:
   tipo : string (ex: area,bar,...)
   id: id do Gráfico 
   //define tbm o source js da montagem do gráfico//
*/
import React, {useState, useEffect } from "react";


function Grafico(props){
    const [tipo, setTipo] = useState(props.tipo);


    useEffect(() => {
        // const script = document.createElement('script');
        // script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js";
        // script.async = true;
        // document.body.appendChild(script);
        if( tipo == "area" ){
            const script1 = document.createElement('script');
            script1.src = "/sb_black/assets/demo/chart-area-demo.js";
            script1.async = true;
            document.body.appendChild(script1);
        }
        
        if( tipo == "bar" ){
           const script2 = document.createElement('script');
           script2.src = "/sb_black/assets/demo/chart-bar-demo.js";
           script2.async = true;
           document.body.appendChild(script2);
        }    
       
         return () => {
        //    if( tipo == "area" ){ 
        //        document.body.removeChild(script1);
        //    }
        //    if( tipo == "bar" ){ 
        //        document.body.removeChild(script2);
        //    }  
           
        }
      }, [tipo]);
    
  return(
    <canvas id ={props.id} width={props.wd} height={props.hg}></canvas>
  );
}


export default Grafico;

