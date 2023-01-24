import { Link } from "react-router-dom"
import style from "./searchcard.module.scss"


export const SearchCard = (props) => {
    let link=`/Products/${props.data.id}`
    return (
        <Link to={link}>
            <div className={style.searchcard}>
                <img src={props.data.img} alt={`${props.data.name}_icon`}  />
                <h2>{props.data.name}</h2>
                <p>{props.data.subName}</p>
            </div>
        </Link>
    )
}