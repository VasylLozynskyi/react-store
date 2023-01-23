import style from "./filter.module.scss"
export const FilterBtn = (props) => {
    return (
        <button className={style.btns_filter}>{props.data}</button>
    )
}