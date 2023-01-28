import style from "./product.module.scss"
export const RespondItem = (props) => {
    return (
        <div className={style.responds}>
            <h2>Author: <span>{props.resp.author}</span></h2>
            <p>Title:</p>
            <h3>{props.resp.title}</h3>
            <p className={style.info_text}>{props.resp.text}</p>
            <p>Date: <span>{props.resp.date}</span></p>
            <p>Рейтинг: {props.resp.rating}</p>
        </div>
    )
}