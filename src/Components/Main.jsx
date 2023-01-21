import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Header/Header";
import style from "./main.module.scss"

const Main = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <Routes>
               
            </Routes>
        </div>
    )
}
export default Main;