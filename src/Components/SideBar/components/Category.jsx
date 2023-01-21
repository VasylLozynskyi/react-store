import style from "../sidebar.module.scss"
export const Category = (props) => {
    return (
        <div className={style.category_bar}>
            <div className={style.category_icon}>
                <img src={props.data.img_icon} alt="icon" />
            </div>
            <p>{props.data.name}</p>
        </div>
    )
}