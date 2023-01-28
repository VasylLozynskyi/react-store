import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import star_icon from "../../../assets/images/star-unfilled.png"
import style from "./cardinbasket.module.scss"


export const CardInBasket = (props) => {
    let link=`/Products/${props.data.id}`;
    const [count, setcount] = useState(1);
    const [totalpricecard, setTotalpricecard] = useState(+props.data.price);
    const divProduct = () => {
        setcount(count-1);
        setTotalpricecard(totalpricecard - +props.data.price);
    }
    
    const addProduct = () =>{
        setcount(count+1);
        setTotalpricecard(totalpricecard + +props.data.price);
    }
    useEffect(() =>{
        if (count === 0){
        props.toRemove(props.data);
        }
    }, [count])
    return (
        <div className={style.card_product} >
            <div className={style.flex_product}>
                <Link to={link}>
                    <img src={props.data.img} alt={props.data.name} />
                </Link>
                <div className={style.product_context}>
                    <div className={style.rate}>
                        <img className={style.star_icon} src={star_icon} alt="star_icon" />
                        <span>{props.data.rating.rate}</span>
                    </div>
                    <Link to={link}>
                        <h2>{props.data.name}</h2>
                        <p className={style.card_category}>{props.data.category}</p>
                    </Link>
                    <div className={style.count_section}>
                        <p className={style.card_price}>{props.data.price}$</p>
                        <div className={style.count_btns}>
                            <button className={style.btncount} onClick={divProduct}>-</button>
                            <span>{count}</span>
                            <button className={style.btncount} onClick={addProduct}>+</button>
                        </div>
                        <p className={style.card_price}>{totalpricecard.toFixed(2)}$</p>
                    </div>
                </div>
            </div>
        </div>
    )
}