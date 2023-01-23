import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./body.module.scss"
import { Filter } from "./Filter/Filter";
import Products from "./Products/Products"

const Body = (props) => {
    const [showProduct, setShowProduct] = useState("");
    useEffect(()=>{
        setShowProduct(props.products)
    }, props.products)
  
    const HandleFilter = (e) => {
        if (e.target.localName === "button"){
            switch (e.target.textContent) {
                case "Top":
                    setShowProduct(props.products.filter(product => product.filter === "Top"))   
                    break;
                case "Popullar":
                    setShowProduct(props.products.filter(product => product.filter === "Popullar"))   
                    break;
                case "recommended":
                    setShowProduct(props.products.filter(product => product.filter === "recommended"))   
                    break;
                default:
                    setShowProduct(props.product)   
                    break;
            }
        }
        

    }
    return (
            <div className={style.body_container} >
                <div onClick={HandleFilter}>
                    <Filter 
                    btn_categories = {props.btn_categories}
                    btn_filter = {props.btn_filter}
                    />
                </div>
                <div className={style.products_container}>
                    <Products products = {showProduct} />
                </div>
            </div>
    )
}
export default Body;