import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import style from "./main.module.scss"

import { categories_btns, filter_btns} from "../data/data_btn"
import { slide_datas } from "../data/data_slider";
import { nav } from "../data/data";

import { db } from "./utils/firebase";
import { onValue, ref } from "firebase/database";

import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/SideBar";
import { Body } from "./Body/Body";
import { SearchBar } from "./SearchBar/SearchBar";
import { SlideBar } from "./SlideBar/SlideBar";
import { About } from "./About/About";
import { Product } from "./Product/Product";
import { Contacts } from "./Contacts/Contacts";
import { SearchPage } from "./SearchPage/SearchPage";
import { Profile } from "./Profile/Profile";
import { Basket } from "./Basket/Basket";
import { createMapLinks } from "./utils/functions";
import { Bread } from "./components/bread/Bread";

const Main = (props) => {
    const [products, setProducts] = useState([]);
    const [user, setUser]= useState({});
    const [userPtofile, setUsersProfile]= useState({});
    const [showloginafterlogout, setShowloginafterlogout]= useState({display: "block"})
    const [tologin, setTologin] = useState({display: "none"});
    const [CartItems, setCartItems]= useState([]);
    const [searchData, setSearchData] = useState("");
    const [bread, setBread]=useState([]);
    const location = useLocation();
    // const [addtobasket, setAddtobasket]= useState([]);

    useEffect(() => {
       if (location.pathname.length >= 27) {
        setBread([location.pathname.substring(22)]);
       } else setBread([location.pathname.substring(22)]);
    }, [location])
    
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
   
    useEffect(() => {
        const query = ref(db, "users/"+user.uid);
        return onValue(query, (snapshot) => {
          const data = snapshot.val();
          if (snapshot.exists()) {
            setUsersProfile(data);
          }
        });
      }, [user]);

    const getSearchData = (data) => {
        if (data) setSearchData(data);
    }
    const toProfileUser = (userData) => {
        if (userData) setUser(userData);
    }
    const showLogin = (data) => {
        if (data) setShowloginafterlogout(data);
    }
    const toLogin = () => {
        setTologin({display: "block"});
    }
    const addToBasketProduct = (basketProduct) =>{
        const exist = CartItems.find((x) => x.id === basketProduct.id);
        if (exist) {
            const newCartItems = CartItems.map((x) => x.id === basketProduct.id ? {...exist, qty: exist.qty + 1} : x);
            setCartItems(newCartItems);
        } else {
            const newCartItems = [...CartItems, {...basketProduct, qty: 1}];
            setCartItems(newCartItems);
        }
    }
    const onRemove = (params) => {
        const exist = CartItems.find((x) => x.id === params.id);
        if (exist.qty === 1) {
            const newCartItems = CartItems.filter((x) => x.id !== params.id);
            setCartItems(newCartItems);
        } else {
            const newCartItems = CartItems.map((x) => x.id === params.id ? {...exist, qty: exist.qty - 1} : x);
            setCartItems(newCartItems);
        }
    }
    return (
        <div className={style.wrapper}>
            <Header 
                nav={nav} 
                toProfileUser={toProfileUser} 
                toLogout={showloginafterlogout} 
                tologin={tologin} 
                countbasket = {CartItems.length} 
            />
            <div className={style.main_flex_container}>
                <SideBar data = {categories_btns} nav= {nav}/>
                <div className={style.body_flex_container}>
                    <SearchBar onSearch={getSearchData} />
                    <SlideBar slide_datas = {slide_datas} />
                    <div className={style.bread}>
                        <Bread mass={bread}/>
                    </div>
                    <Routes>
                        {createMapLinks(products).map((body, index) => <Route key={index} path={body.link} element={<Body
                                                    addToBasketProduct={addToBasketProduct} 
                                                    btn_categories = {categories_btns}
                                                    btn_filter = {filter_btns}
                                                    products = {body.data}
                                                    />}  /> )}
                        <Route path="/react-store/About" element={<About />}  />
                        <Route path="/react-store/Contacts" element={<Contacts />}  />
                        <Route path={`/react-store/Products/:id/`} element={<Product userdata={userPtofile}
                                                                        toLogin={toLogin} 
                                                                        addToBasketProduct={addToBasketProduct} />}  />
                        <Route path="/react-store/Products/search" element={<SearchPage data={searchData} />} />
                        <Route path="/react-store/Profile" element={<Profile 
                                                            userdata={userPtofile}                 
                                                            show_login_after_logout={showLogin}
                                                            toLogin={toLogin}
                                                        />} 
                        />
                        <Route path="/react-store/basket" element={<Basket arr={CartItems} 
                                                            addToBasketProduct={addToBasketProduct}
                                                            onRemove={onRemove} 
                                                            user={user} 
                                                            toLogin={toLogin} 
            
                                                        />}  />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
export default Main;