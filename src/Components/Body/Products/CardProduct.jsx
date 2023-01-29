import style from "./products.module.scss"
import {Link} from "react-router-dom";
import star_icon from "../../../assets/images/star-unfilled.png"

export const CardProduct = (props) => {
    let link = `/Products/${props.data.id}`;
    const addToBasketHandler =() =>{
        props.basket(props.data);
    }
    return (
       
        <div className={style.card_product}>
            <div className={style.flex_product}>
                <Link to={link}>
                    <img src={props.data.img} alt={props.data.name} />
                </Link>
                <div className={style.product_context}>
                    <div>
                        <img className={style.star_icon} src={star_icon} alt="star_icon" />
                        <span>{props.data.rating.rate}</span>
                    </div>
                <Link to={link}>
                    <h2>{props.data.name}</h2>
                    <p className={style.card_category}>{props.data.category}</p>
                    <p className={style.card_price}>{props.data.price}$</p>
                </Link>
                    <button className={style.btn_add_tobasket} onClick={addToBasketHandler}>
                        +
                    </button>
                </div>
            </div>
        </div>
        )
}