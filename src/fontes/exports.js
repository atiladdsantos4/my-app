const myHello =(
   <h1>Hello React!</h1>  
); 

const myTable = (
  <table>
    <tr>
      <th>Name</th>
    </tr>
    <tr>
      <td>John</td>
    </tr>
    <tr>
      <td>Elsa</td>
    </tr>
  </table>
);

const myDiv = (
    <div>Hello React div  comp!</div>
);

const myTopLevel = (
    <>
       <p>Hello React div  comp!</p>
       <p>Hello React div  comp!</p>
    </>   
);
// Mais de um elemento precisa estar enrre um div ou fragemnto <>,</> 


export { myHello, myTable, myDiv, myTopLevel }
// sem a palavar default exporta todas as consts

