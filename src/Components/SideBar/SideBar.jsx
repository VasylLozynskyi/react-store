import React from "react";
import style from "./sidebar.module.scss"
import triangle_icon from "../../assets/images/category_icons/triangle-pointed.png"
import { Category } from "../components/category/Category";
import {Link} from "react-router-dom"
import { Nav } from "../Header/Nav"

export const SideBar = (props) => {

    let categories = props.data ? props.data.map(card => <Category key={card.id} data = {card}/>) : "";
    return (
        <div className={style.sidebar_conrainer}>
            <div className={style.sidebar_main}>
            {props.nav.map((nav, index) => <Nav key={index} nav={nav} />
                   )} 
            </div>
            <div className={style.sidebar_category_container}>
                <div className={style.categoty_header}>
                    <h2>Category</h2>
                    <img src={triangle_icon} alt="pointer_icon" />
                </div>
                <div className={style.categories_container}>
                    {categories}
                </div>
            </div>
        </div>
    )
}