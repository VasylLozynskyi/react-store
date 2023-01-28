import React from "react";
import { useState } from "react";

import style from "./basket.module.scss"
import { MapBasket } from "./MapBasket";

export const Basket = (props) => {
    const [showloginpopup, setShowloginpopup] = useState({display: "none"});
    const [total, setTotal]=useState(0);

    const handleToOrder =() => {
        if(props.arr.length === 0){
            alert(`Nothing selected to basket`)
        } else if(props.user.uid !== undefined){
            //back-end code 
            alert(`To order ${props.user.email} `)
            // {user} and {arr of products} and {info about ordered products count, totalprice}
            // props.arr , 
          } else {
            setShowloginpopup({display: "block"})
           }
    }
    const handleToLogin = () => {
        props.tologin();
        setShowloginpopup({display: "none"})
    }

    const dellArrr = (params) => {
        props.dellArr(params);
    }
    return (
        <div className={style.basket}>
            <h2>Basket</h2>
            <MapBasket products={props.arr} dellArr={dellArrr} />
            <div className={style.order_section}>
                <p className={style.totalprice}>Total Price: <span>{total.toFixed(2)}$</span></p>
                <button className={style.btn_order} onClick={handleToOrder}>To Order</button>
            </div>
            <div className={style.popup_login} style={showloginpopup}>
                <p>Please <button className={style.login} onClick={handleToLogin}>Login</button> to continue </p>
            </div>
        </div>
    )
}