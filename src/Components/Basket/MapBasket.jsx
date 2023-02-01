import style from "./basket.module.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import star_icon from "../../assets/images/star-unfilled.png"

export const MapBasket = (props) =>{
    const ItemsPrice = props.products.reduce((a, c) => a+c.qty *c.price, 0);
    const emptypage = <div className={style.styleEmpty}>Nothing selected to basket</div>
    const [productInBasket, setProductInBasket] = useState(emptypage);
    const [showloginpopup, setShowloginpopup] = useState({display: "none"});

    // useEffect(() =>{
    //     if (count === 0){
    //   //  props.toRemove(props.data);
    //     }
    // }, [count])

    const handleToOrder =() => {
        if(props.products.length === 0){
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
        props.toLogin();
        setShowloginpopup({display: "none"})
    }

     useEffect(() => {
       if (props.products.length > 0) {
        setProductInBasket(props.products.map((product, index) => 
        <div key={index} className={style.card_product} >
        <div className={style.flex_product}>
            <Link to={`/react-store/Products/${product.id}`}>
                <img src={product.img} alt={product.name} />
            </Link>
            <div className={style.product_context}>
                <div className={style.rate}>
                    <img className={style.star_icon} src={star_icon} alt="star_icon" />
                    <span>{product.rating.rate}</span>
                </div>
                <Link to={`/react-store/Products/${product.id}`}>
                    <h2>{product.name}</h2>
                    <p className={style.card_category}>{product.category}</p>
                </Link>
                <div className={style.count_section}>
                    <p className={style.card_price}>{product.price}$</p>
                    <div className={style.count_btns}>
                        <button className={style.btncount} onClick={() => {props.onRemove(product)}}>-</button>
                        <span>{product.qty}</span>
                        <button className={style.btncount} onClick={() => {props.addToBasketProduct(product)}}>+</button>
                    </div>
                    <p className={style.card_price}>{(+product.qty * +product.price).toFixed(2)}$</p>
                </div>
            </div>
        </div>
    </div> ))
        } else if (props.products.length === 0) setProductInBasket(emptypage)
    }, [props.products]);
    
    return (
        <div>
             <div className={style.products}>
                {productInBasket}
            </div>
            {}
            <div className={style.order_section}>
                <p className={style.totalprice}>Total Price: <span>{ItemsPrice.toFixed(2)}$</span></p>
                <button className={style.btn_order} onClick={handleToOrder}>To Order</button>
            </div>
            <div className={style.popup_login} style={showloginpopup}>
                <p>Please <button className={style.login} onClick={handleToLogin}>Login</button> to continue </p>
            </div>
        </div>
    )
}