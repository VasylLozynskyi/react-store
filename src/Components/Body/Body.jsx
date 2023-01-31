import React from "react";
import { useEffect, useState } from "react";
import { Loading } from "../components/loading/Loading";
import { filterProducts } from "../utils/functions";
import style from "./body.module.scss"
import { Filter } from "./Filter/Filter";
import Products from "./Products/Products"

export const Body = (props) => {
    const [showProduct, setShowProduct] = useState("");

    useEffect(()=>{
        setShowProduct(props.products)
    }, [props.products])
  
    const HandleFilter = (e) => {
        if (e.target.localName === "button") setShowProduct(filterProducts(e.target, props.products));
    }
    const addToBasket = (addToBasket) =>{
        props.addToBasketProduct(addToBasket);
    }
    if (showProduct.length === 0){ return( <Loading /> ) }
    return (
            <div className={style.body_container} >
                <div className={style.filter} onClick={HandleFilter} >
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
