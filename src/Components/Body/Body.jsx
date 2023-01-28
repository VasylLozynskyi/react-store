import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import style from "./body.module.scss"
import { Filter } from "./Filter/Filter";
import Products from "./Products/Products"

export const Body = (props) => {
    const [showProduct, setShowProduct] = useState("");
    const [a, setA]=useState([]);
    useEffect(()=>{
        setShowProduct(props.products)
    }, [props.products])
  
    function sortTop(a,b){
        if(+a.rating.rate<+b.rating.rate)return 1;
        if(+a.rating.rate>+b.rating.rate)return -1;
        return 0;
      }

    const HandleFilter = (e) => {
        let a=[];
        if (e.target.localName === "button"){
            switch (e.target.textContent) {
                case "Top":
                     setShowProduct(props.products.filter(product => product.filter === "Top"))  
                //    a =  showProduct.sort(sortTop)
                    // setShowProduct(a.sort(sortTop))   
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
    const addToBasket = (addToBasket) =>{
        props.addToBasketProduct(addToBasket);
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
                    <Products products = {showProduct} addToBasket={addToBasket} />
                </div>
            </div>
    )
}
