
import Card from "./card";
import Grafico from "./grafico";
import TableCustom from "./TableCustom";
import React, {useState} from "react";
import ExibirGrafico from "./ExibirGrafico";
import ExibirTabelas from "./ExibirTabelas";
import Produto from "../view/produto";
// import FormExemplo from "../view/form_produto";
import FormProduto from "../view/formulario_produto";
import FormCliente from "../view/formulario_cliente";
import TableProduto from "./TableProduto";
import TableCliente from "./TableClientes";
import Custom from "./Custom";

function Cards(props){
  const [Title,setTitle] = useState(props.title);  
  return(
    <>
    <div className="container-fluid px-4">
        <h1 className="mt-4">{Title}</h1>
        <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item active">{Title}</li>
        </ol>
        <div className="row">
            <div className="col-xl-3 col-md-6">
                <Card classe="card bg-primary text-white mb-4" texto_link="View Details" texto="Primary Card"/>                     
            </div>
            <div className="col-xl-3 col-md-6">
                <Card classe="card bg-warning text-white mb-4" texto_link="View Details" texto="Warning Card"/>                     
            </div>
            <div class="col-xl-3 col-md-6">
                <Card classe="card bg-success text-white mb-4" texto_link="View Details" texto="Success Card"/>                     
            </div>
            <div className="col-xl-3 col-md-6">
                <Card classe="card bg-danger text-white mb-4" texto_link="View Details" texto="Danger Card"/>                     
            </div>
        </div>
    </div>    
    </>
  );
}

function Graficos(props){
  const [Title,setTitle] = useState(props.title);  
  return(
    <>
    <div className="container-fluid px-4">
        <h1 className="mt-4">{Title}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{Title}</li>
            </ol>
        <div className="row">
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-area me-1"></i>
                        Area Chart Example
                    </div>
                    <div className="card-body">
                        <Grafico id="myAreaChart" tipo="area" wd="100%" hg="40%"></Grafico>
                    </div>
                </div>
            </div>
            <div className="col-xl-6">
                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i>
                        Bar Chart Example
                    </div>
                    <div className="card-body">
                        <Grafico id="myBarChart" tipo="bar" wd="100%" hg="40%"></Grafico>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )  
}

function Tabelas(props){
    const [Title,setTitle] = useState(props.title);
    return(
     <>
     <div className="container-fluid px-4">
           <h1 className="mt-4">{Title}</h1>
           <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{Title}</li>
           </ol>
       <div className="card mb-4">
         <TableCustom id="datatablesSimple" title="DataTable Custom Example (React Componente)" colunas={props.colunas}/>
       </div>
     </div>   
    </>
   ); 
}

function Index(props){
    const [Title,setTitle] = useState(props.title);
    return (
        <>
        <div className="container-fluid px-4">
            <h1 className="mt-4">{Title}</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">{Title}</li>
            </ol>
            <div className="row">
                <div className="col-xl-3 col-md-6">
                    <Card classe="card bg-primary text-white mb-4" texto_link="View Details" texto="Primary Card"/>                     
                </div>
                <div className="col-xl-3 col-md-6">
                    <Card classe="card bg-warning text-white mb-4" texto_link="View Details" texto="Warning Card"/>                     
                </div>
                <div className="col-xl-3 col-md-6">
                    <Card classe="card bg-success text-white mb-4" texto_link="View Details" texto="Success Card"/>                     
                </div>
                <div className="col-xl-3 col-md-6">
                    <Card classe="card bg-danger text-white mb-4" texto_link="View Details" texto="Danger Card"/>                     
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-area me-1"></i>
                            Area Chart Example
                        </div>
                        <div className="card-body">
                            <Grafico id="myAreaChart" tipo="area" wd="100%" hg="40%"></Grafico>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-bar me-1"></i>
                            Bar Chart Example
                        </div>
                        <div className="card-body">
                            <Grafico id="myBarChart" tipo="bar" wd="100%" hg="40%"></Grafico>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <TableCustom id="datatablesSimple" title="DataTable Custom Example (React Componente)" colunas={props.colunas}/>
            </div>
        </div>
        </>
    );
}

function Main(props){
    console.log('---->Main<----');
    console.log(props.saida);

    const [vie, setvie] = React.useState(props.saida);

    const colunas = [
        "name",
		"position",
		"office",
		"age",
		"start_date",
		"salary"
    ];

    const visao  = () => {
        switch(vie){
           
            case 'cards':
              console.log('cards');  
              return <Cards title="Cards"/>;  
           
            case 'graficos':
              console.log('graficos');   
              return <Graficos title="Gráficos"/>;  
           
            case 'tabelas':
              console.log('tabelas');    
              return <Tabelas colunas={colunas} title="Tabelas"/>;   
            
            case 'charts_geral':
              console.log('ExibirGrafico');    
              return <ExibirGrafico/>;     
            
            case 'tabelas_geral':
              console.log('ExibirTabelas');    
              return <ExibirTabelas/>;     
            
            case 'novo_produto':
              console.log('novo_produto');    
              return <Produto title="Novo Produto"/>;       
            
            case 'form_produto':
              console.log('form_exemplo');    
              return <FormProduto title=" Novo Produto"></FormProduto>;  

            case 'lista_produto':
               console.log('lista_produto');    
               return <TableProduto title=" Listagem de Produtos"/>;  

            case 'form_cliente':
               console.log('form_cliente');    
               return <FormCliente title=" Novo Cliente"></FormCliente>;  
            
            case 'lista_cliente':
               console.log('lista_cliente');    
               return <TableCliente title=" Listagem de Clientes"/>;  
            
            case 'custom':
               console.log('custom');    
               return <Custom title=" Custom Componete"/>;  
               

            default:
              return <Index colunas={colunas} title="Dashboard"/>;   

          break;
        } 
    };

    return (
        <>
        {visao(props)}
        {/* <div className="container-fluid px-4">
            <h1 className="mt-4">Dashboard</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Dashboard</li>
            </ol>
            <div className="row">
                <div className="col-xl-3 col-md-6">
                    <Card className="card bg-primary text-white mb-4" texto_link="View Details" texto="Primary Card"/>                     
                </div>
                <div className="col-xl-3 col-md-6">
                    <Card className="card bg-warning text-white mb-4" texto_link="View Details" texto="Warning Card"/>                     
                </div>
                <div className="col-xl-3 col-md-6">
                    <Card className="card bg-success text-white mb-4" texto_link="View Details" texto="Success Card"/>                     
                </div>
                <div className="col-xl-3 col-md-6">
                    <Card className="card bg-danger text-white mb-4" texto_link="View Details" texto="Danger Card"/>                     
                </div>
            </div>
            <div className="row">
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-area me-1"></i>
                            Area Chart Example
                        </div>
                        <div className="card-body">
                            <Grafico id="myAreaChart" tipo="area" wd="100%" hg="40%"></Grafico>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <i className="fas fa-chart-bar me-1"></i>
                            Bar Chart Example
                        </div>
                        <div className="card-body">
                            <Grafico id="myBarChart" tipo="bar" wd="100%" hg="40%"></Grafico>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mb-4">
                <TableCustom id="datatablesSimple" title="DataTable Custom Example" colunas={colunas}/>
            </div>
        </div> */}
        </>
    );
}
export default Main;