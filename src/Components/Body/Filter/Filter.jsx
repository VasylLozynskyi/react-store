import style from "./filter.module.scss"
import { FilterBtn } from "./FilterBtn";
import filter_icon from "../../../assets/images/filter.png"
import { useState } from "react";
import { Category } from "../../components/category/Category";

export const Filter = (props) => {

    let btns = props.btn_filter ? props.btn_filter.map(btn => <FilterBtn key = {btn.id} data = {btn}/>): "";
    let category = props.btn_categories ? props.btn_categories.map(card => <Category key={card.id} data = {card}/>) : "";
    const [show_popup, setShowPopup] = useState({display: "none"});
   
    const showFilterHandler = () => {
            setShowPopup({display: "block"})
    }
    const handleCloseFilter = (e) => {
        if (e.target.attributes.closepopup  === undefined || e.target.attributes.closepopup.value === "false") return;
        if (e.target.attributes.closepopup.value === "true"){
            setShowPopup({display: "none"})
        } 
    }
    const handleClosePopupBtn = () => {
        setShowPopup({display: "none"})
    }
    return (
    <>
        <div className={style.filter_container}>
            <div className={style.flex_btns_filter}>
                {btns}
                <button className={style.filter_btn} onClick={showFilterHandler}>
                    <img src={filter_icon} alt="filter_icon" />
                    Filter</button>
            </div>
        </div>
        <div className={style.popup_container} style={show_popup} onClick={handleCloseFilter} closepopup={"true"}>
                <div className={style.popup} closepopup={"false"}>
                    <div>
                        <h2>Filter</h2>
                    </div>
                    
                    <div className={style.flex_btns_category_popup}>
                        {category}
                    </div>
                    <button className={style.btn_closepopup} onClick={handleClosePopupBtn}>X</button>
                </div>
        </div>
    </>
    )
}