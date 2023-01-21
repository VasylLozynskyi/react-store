import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Header/Header";
import style from "./main.module.scss"
import { SideBar } from "./SideBar/SideBar";
import { Categories} from "../data/data_btn"
import Body from "./Body/Body";
import { SearchBar } from "./SearchBar/SearchBar";
import {SlideBar} from "./SlideBar/SlideBar"

const Main = () => {
    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.mainflex_container}>
                <SideBar data = {Categories}/>
                <div className={style.slidebar_search}>
                    <SearchBar />
                    <SlideBar sliderWidth="400" sliderHeight="250" />
                </div>
                
            </div>
            <Routes>
            <Route path="/*" element={<Body/>}  />
            {/* <Route path="/login" element={<SignIn />}  /> */}
            {/* <Route path="*" element={}  /> */}
             </Routes>
        </div>
    )
}
export default Main;