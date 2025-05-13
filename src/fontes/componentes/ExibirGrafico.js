/* Hook para renderizaçõa de Gráfico
   parametros:
   tipo : string (ex: area,bar,...)
   id: id do Gráfico 
   //define tbm o source js da montagem do gráfico//
*/
import React, {useState, useEffect } from "react";


function ExibirGrafico(props){
    const [tipo, setTipo] = useState(props.tipo);


    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = "/sb_black/assets/demo/chart-area-demo.js";
        script1.async = true;
        document.body.appendChild(script1);
    
        const script2 = document.createElement('script');
        script2.src = "/sb_black/assets/demo/chart-bar-demo.js";
        script2.async = true;
        document.body.appendChild(script2);

        const script3 = document.createElement('script');
        script3.src = "/sb_black/assets/demo/chart-pie-demo.js";
        script3.async = true;
        document.body.appendChild(script3);
        
        
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
    <>
      {/* <div id="layoutSidenav_content">
                <main> */}
                    <div class="container-fluid px-4">
                        <h1 class="mt-4">Charts</h1>
                        <ol class="breadcrumb mb-4">
                            <li class="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li class="breadcrumb-item active">Charts</li>
                        </ol>
                        <div class="card mb-4">
                            <div class="card-body">
                                Chart.js is a third party plugin that is used to generate the charts in this template. The charts below have been customized - for further customization options, please visit the official
                                <a target="_blank" href="https://www.chartjs.org/docs/latest/">Chart.js documentation</a>
                                .
                            </div>
                        </div>
                        <div class="card mb-4">
                            <div class="card-header">
                                <i class="fas fa-chart-area me-1"></i>
                                Area Chart Example
                            </div>
                            <div class="card-body"><canvas id="myAreaChart" width="100%" height="30"></canvas></div>
                            <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                        </div>
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-bar me-1"></i>
                                        Bar Chart Example
                                    </div>
                                    <div class="card-body"><canvas id="myBarChart" width="100%" height="50"></canvas></div>
                                    <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="card mb-4">
                                    <div class="card-header">
                                        <i class="fas fa-chart-pie me-1"></i>
                                        Pie Chart Example
                                    </div>
                                    <div class="card-body"><canvas id="myPieChart" width="100%" height="50"></canvas></div>
                                    <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </main> */}
      {/* </div> */}
    </>
  );
}


export default ExibirGrafico;

