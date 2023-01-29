import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { filterProducts } from "../utils/functions";
import style from "./body.module.scss"
import { Filter } from "./Filter/Filter";
import Products from "./Products/Products"

export const Body = (props) => {
    const [showProduct, setShowProduct] = useState(props.products);

    useEffect(()=>{
        setShowProduct(props.products)
    }, [props.products])
  
    const HandleFilter = (e) => {
        setShowProduct(filterProducts(e.target, props.products));
    }
    const addToBasket = (addToBasket) =>{
        props.addToBasketProduct(addToBasket);
    }
    return (
            <div className={style.body_container} >
                <div onClick={HandleFilter} >
                    <Filter 
                    btn_categories = {props.btn_categories}
                    btn_filter = {props.btn_filter}
                    />
                </div>
                <div className={style.products_container}>
                    <Products products = {showProduct} addToBasket={addToBasket} />
                </div>
            </div>
    )
}
