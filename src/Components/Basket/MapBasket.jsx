import style from "./basket.module.scss"
import { useEffect, useState } from "react";
import { CardInBasket } from "../components/cardInbasket/CardInBasket";

export const MapBasket = (props) =>{
    const emptypage = <div className={style.styleEmpty}>Nothing selected to basket</div>
    const [productInBasket, setProductInBasket] = useState(emptypage);
    
    const toRemove = (params) => {
        props.dellArr(params)
    }

     useEffect(() => {
       if (props.products.length > 0) {
        setProductInBasket(props.products.map((product, index) => 
             <CardInBasket key={index} 
                            data={product} 
                            toRemove={toRemove} 
                /> ))
        } else if (props.products.length === 0) setProductInBasket(emptypage)
    }, [props.products]);
    
    return (
        <div className={style.products}>
            {productInBasket}
        </div>
    )
}