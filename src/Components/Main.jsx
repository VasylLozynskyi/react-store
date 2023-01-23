import React from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./Header/Header";
import style from "./main.module.scss"
import { SideBar } from "./SideBar/SideBar";
import { Categories, slide_datas, filter_btns} from "../data/data_btn"
import Body from "./Body/Body";
import { SearchBar } from "./SearchBar/SearchBar";
import {SlideBar} from "./SlideBar/SlideBar";
import {Products} from "../data/products"
import { About } from "./About/About";

const Main = () => {
    let map =[
        {link: "/*", data: Products},
        {link: "/Products/Computer", data: Products.filter(product => product.category === "Computer")},
        {link: "/Products/Headphones", data: Products.filter(product => product.category === "Headphones")},
        {link: "/Products/VR Glasses", data: Products.filter(product => product.category === "VR Glasses")},
        {link: "/Products/Keyboard", data: Products.filter(product => product.category === "Keyboard")},
        {link: "/Products/Mouse Gaming", data: Products.filter(product => product.category === "Mouse Gaming")},
    ];
    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.mainflex_container}>
                <div>
                    <SideBar data = {Categories}/>
                </div>
                <div className={style.slidebar_search}>
                    <SearchBar />
                    <SlideBar slide_datas = {slide_datas} />
                    <Routes>
                        {map.map((body, index) => <Route key={index} path={body.link} element={<Body 
                                                    btn_categories = {Categories}
                                                    btn_filter = {filter_btns}
                                                    products = {body.data}
                                                    />}  /> )}
                        <Route path="/About" element={<About />}  />
                        {/* <Route path="*" element={}  /> */}
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Main;