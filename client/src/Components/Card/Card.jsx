import style from './Card.module.css';
import { Link } from "react-router-dom";


const Card = (props) => {

    return(
        <div>
            <Link to={'/detail/' + props.id} >
            <div className={style.cardMain}>
                <p>Name: {props.name}</p>
                <img className= {style.img} src={props.image} alt={props.name} />
                <div className={style.cardMain}>Types: 
                <hr />
                    {props.types.map(t => (<div>{t}</div>))}
                </div>
            </div>
            </Link>
        </div>
    )
}

export default Card;