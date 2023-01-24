import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import style from "./main.module.scss"
import { categories_btns, slide_datas, filter_btns} from "../data/data_btn"
import { nav } from "../data/data";

import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/SideBar";
import { Body } from "./Body/Body";
import { SearchBar } from "./SearchBar/SearchBar";
import { SlideBar } from "./SlideBar/SlideBar";
import { About } from "./About/About";
import { Product } from "./components/product/Product";
import { Contacts } from "./Contacts/Contacts";

import { db } from "./utils/firebase";
import { onValue, ref } from "firebase/database";
import { SearchPage } from "./SearchPage/SearchPage";

const Main = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const query = ref(db, "products");
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
    
          if (snapshot.exists()) {
             // eslint-disable-next-line
            Object.values(data).map((product) => {
              setProducts((products) => [...products, product]);
            });
          }
        });
      }, []);
    let map =[
        {link: "/*", data: products},
        {link: "/Products/Computer", data: products.filter(product => product.category === "Computer")},
        {link: "/Products/Headphones", data: products.filter(product => product.category === "Headphones")},
        {link: "/Products/VR Glasses", data: products.filter(product => product.category === "VR Glasses")},
        {link: "/Products/Keyboard", data: products.filter(product => product.category === "Keyboard")},
        {link: "/Products/Mouse Gaming", data: products.filter(product => product.category === "Mouse Gaming")},
    ];
    const [searchData, setSearchData] = useState();
    const getSearchData = (data) => {
        if (data) {
            setSearchData(data);
        }
    }
    return (
        <div className={style.wrapper}>
            <Header nav= {nav} />
            <div className={style.main_flex_container}>
                <SideBar data = {categories_btns} nav= {nav}/>
                <div className={style.body_flex_container}>
                    <SearchBar onSearch={getSearchData} />
                    <SlideBar slide_datas = {slide_datas} />
                    <Routes>
                        {map.map((body, index) => <Route key={index} path={body.link} element={<Body 
                                                    btn_categories = {categories_btns}
                                                    btn_filter = {filter_btns}
                                                    products = {body.data}
                                                    />}  /> )}
                        <Route path="/About" element={<About />}  />
                        <Route path="/Contacts" element={<Contacts />}  />
                        <Route path="/Products/:id/" element={<Product />}  />
                        <Route path="/Products/search" element={<SearchPage data={searchData} />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Main;