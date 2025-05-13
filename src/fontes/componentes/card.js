/* commnsts
*/
function Card(props){
    return(
    <>
        <div class={props.classe}>
            <div class="card-body">{props.texto}</div>
            <div class="card-footer d-flex align-items-center justify-content-between">
                <a class="small text-white stretched-link" href="#">{props.texto_link}</a>
                <div class="small text-white"><i class="fas fa-angle-right"></i></div>
            </div>
        </div>
    </> 
  );
}
export default Card;