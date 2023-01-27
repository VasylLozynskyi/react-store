import { CardProduct } from "./CardProduct";
import style from "./products.module.scss";

const Products = (props) => {
    const addToBasketProduct = (product) =>{
        props.addToBasket(product);
    }

    let product = props.products ? props.products.map(product => <CardProduct key = {product.id} data={product} basket={addToBasketProduct}/>): "";
    return (
            <div className={style.products_container} >
                {product}
            </div>
    )
}
export default Products;