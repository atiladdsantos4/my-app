/*
id's:
  tst->teste
  hom->homologação
  prd->produção
*/
//Aqui você define o ambiente de utilização
let env = "tst";
const enviroment =
  [
    {
      id:"tst",
      layout:{
            menu_principal:"Sistema de Gestão Pessoal - Testes"
      },
      endpoint:{
          url:"http://192.168.1.71/projetos/laravel11/public/index.php/api",
          img:"http://192.168.1.71/projetos/laravel11/public/storage/images/"
      }
    },
    {
      id:"hom",
      layout:{
            menu_principal:"Sistema de Gestão Pessoal - Homologação"
      },
      endpoint:{
          url:"http://172.22.9.56:8000/"
      }
    },
    {
      id:"prd",
      layout:{
            menu_principal:"Sistema de Gestão Pessoal - Produção"
      },
      endpoint:{
          url:"http://172.22.9.56:8000/"
      }
    }
  ];
const ConfGlobal = enviroment.filter(envi => envi.id === env);
export default ConfGlobal[0];
