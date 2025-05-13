function Car() {
   return <h2>Hi, I am a Car!</h2>;
}

/*
-----
Props
------
Components can be passed as props, which stands for properties.
Props are like function arguments, and you send them into the component as attributes.
You will learn more about props in the next chapter.
*/
function Onibus(props) {
   return <h2>Hi, I am a Bus! {props.color}</h2>;
}

/*
   Components in Components
   We can refer to components inside other components:
*/
function Garage() {
   return (
     <>
       <h1>Who lives in my Garage?</h1>
       <Car />
     </>
   );
 }


export { Car, Onibus, Garage }; //--> camada de fora <--//