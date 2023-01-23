import style from "../slidebar.module.scss"
import {Link} from "react-router-dom"

export const ItemSlider = (props) => {
    return (
        <div className={style.itemslide_container}>
             <Link href='/products'>
             <div className={style.product_item}>
                <h2>{props.name}</h2>
                <img src={props.img} alt="props.slide" />
            </div>
            </Link>
        </div>
        )
}