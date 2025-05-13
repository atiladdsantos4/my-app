/*
    Ponderações
    -----------
    fixed-bottom fica acima dos botoes de bavegaçao do datatables  
*/
//export default function Clock({ time }) {
export default function Custom() {
    let time = new Date();
    let hours = time.getHours();
    if (hours >= 0 && hours <= 6) {
      document.getElementById('root').className = 'night';
    } else {
      document.getElementById('root').className = 'day';
    }
    return (
      <h1 id="time">
        {time.toLocaleTimeString()}
      </h1>
    );
}
  