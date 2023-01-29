import style from "./filter.module.scss"
export const FilterBtn = (props) => {

    return (
        <button id={props.data.id} className={style.btns_filter}>{props.data.name}</button>
    )
}