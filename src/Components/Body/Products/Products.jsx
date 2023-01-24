import { CardProduct } from "./CardProduct";
import style from "./products.module.scss";

const Products = (props) => {
    let product = props.products ? props.products.map(product => <CardProduct key = {product.id} data={product}/>): "";
    return (
            <div className={style.products_container} >
                {product}
            </div>
    )
}
export default Products;