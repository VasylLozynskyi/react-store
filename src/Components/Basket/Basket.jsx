import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CardInBasket } from "../components/cardInbasket/CardInBasket";
import style from "./basket.module.scss"

export const Basket = (props) => {
    const [showloginpopup, setShowloginpopup] = useState({display: "none"});
    const [arrayProducts, setArrayProducts] = useState(props.arr);
    const emptypage = <div className={style.styleEmpty}>Nothing selected to basket</div>
    const [productInBasket, setProductInBasket] = useState(emptypage);
    useEffect(() => {
       if (arrayProducts.length > 0) {
        setProductInBasket(arrayProducts.map((product, index) => <CardInBasket key={index} data={product} toRemove={toRemove} /> ))
       }
    }, [arrayProducts.length]);
    
    const toRemove =(params)=>{
    // setArrayProducts(arrayProducts.filter(data => {    
    //     return data !== params}))
    }

    const handleToOrder =() => {
        if(!productInBasket.length){
            alert(`Nothing selected to basket`)
        } else if(props.user.uid !== undefined){
            //back-end code 
            alert(`To order ${props.user.email} `)
            // {user} and {arr of products} and {info about ordered products count, totalprice}
            //
          } else {
            setShowloginpopup({display: "block"})
           }
    }
    const handleToLogin = () => {
        props.tologin({display: "block"})
        setShowloginpopup({display: "none"})
    }
    
    return (
        <div className={style.basket}>
            <h2>Basket</h2>
            <div className={style.products}>
                {productInBasket}
            </div>
            <div className={style.order_section}>
                <button className={style.btn_order} onClick={handleToOrder}>To Order</button>
            </div>
            <div className={style.popup_login} style={showloginpopup}>
                <p>Please <button className={style.login} onClick={handleToLogin}>Login</button> to continue </p>
            </div>
        </div>
    )
}