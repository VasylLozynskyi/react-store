import { Link } from "react-router-dom"
import style from "./cardinlist.module.scss"


export const CardInList = (props) => {
    let link=`/Products/${props.data.id}`
    return (
        <Link to={link}>
            <div className={style.searchcard}>
                <img src={props.data.img} alt={`${props.data.name}_icon`}  />
                <h2>{props.data.name}</h2>
                <p>{props.data.subName}</p>
                <p>{props.data.price}$</p>
            </div>
        </Link>
    )
}