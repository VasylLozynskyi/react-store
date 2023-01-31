import style from "./category.module.scss"
import {Link} from "react-router-dom"
export const Category = (props) => {
    let link = `/react-store/Products/${props.data.name}`;
    return (
        <Link to={link} className={style.category_bar}>
            <div>
                <div className={style.category_icon}>
                    <img src={props.data.img_icon} alt="icon" />
                </div>

                <p>{props.data.name}</p>
                </div>
        </Link>
    )
}