import React from "react";

import style from "./basket.module.scss"
import { MapBasket } from "./MapBasket";

export const Basket = (props) => {

    return (
        <div className={style.basket}>
            <h2>Basket</h2>
            <MapBasket products={props.arr} 
                        user= {props.user} 
                        toLogin={props.toLogin} 
                        onRemove={props.onRemove}
                        addToBasketProduct={props.addToBasketProduct}  />
        </div>
    )
}