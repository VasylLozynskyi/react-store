import { CardProduct } from "./CardProduct";
import style from "./products.module.scss"

const Products = (props) => {
    let product = props.products ? props.products.map(product => <CardProduct key = {product.id} data={product}/>): "";
    const selectProductHandler = (e) => {
        console.log(e.target);
    }
    return (
        <div className={style.products_container} onClick={selectProductHandler}>
            {product}
        </div>
    )
}
export default Products;