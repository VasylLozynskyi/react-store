import style from "./products.module.scss"
import {Link} from "react-router-dom";

export const CardProduct = (props) => {
    let link = `/Products/${props.data.id}`;
    const addToBasketHandler =() =>{
        console.log("add product to basket");
    }
    return (
       
        <div className={style.card_product}>
            <div className={style.flex_product}>
                <Link to={link}>
                    <img src={props.data.img} alt={props.data.name} />
                </Link>
                <div>
                <Link to={link}>
                    <h2>{props.data.name}</h2>
                    <p className={style.card_category}>{props.data.category}</p>
                    <p className={style.card_price}>{props.data.price}</p>
                </Link>
                    <button className={style.btn_add_tobasket} onClick={addToBasketHandler}>
                        +
                    </button>
                </div>
            </div>
        </div>
        )
}