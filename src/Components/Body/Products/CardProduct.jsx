import style from "./products.module.scss"

export const CardProduct = (props) => {
    return (
        <div className={style.card_product}>
            <div className={style.flex_product}>
                <img src={props.data.img} alt={props.data.name} />
                <div>
                    <h2>{props.data.name}</h2>
                    <p className={style.card_category}>{props.data.category}</p>
                    <p className={style.card_price}>{props.data.price}</p>
                    <button className={style.btn_add_tobasket}>
                        +
                    </button>
                </div>
            </div>
        </div>
        )
}