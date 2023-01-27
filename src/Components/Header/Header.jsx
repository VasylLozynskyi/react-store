import React from "react";
import style from "./header.module.scss"
import logo from "../../assets/images/Logo.png"
import notification_icon from "../../assets/images/notification.png"
import basket_icon from "../../assets/images/basket.png"
import {Link} from "react-router-dom";
import { useState } from "react";
import { Nav } from "./Nav";
import { LoginIn } from "./LoginIn";
import { useEffect } from "react";

export const Header = (props) => {
    useEffect(()=>{
        setClose_login(props.toLogout);
        setShow_profile({display: "none"})
    }, [props.toLogout])
    useEffect(()=>{
        setShowPopup(props.tologin);
    }, [props.tologin])
    useEffect(()=>{
        setCountproducts(props.countbasket)
    }, [props.countbasket])
    const [close_login, setClose_login] = useState({display: "block"})
    const [show_profile, setShow_profile] = useState({display: "none"})
    const [show_popup, setShowPopup] = useState({display: "none"});
    const [profU, setProfU] = useState({});
    const [countproducts, setCountproducts] = useState(null);
    const handleShowLogin = () => {
        setShowPopup({display: "block"})
    }
    const closeLoginIn =() =>{
        setClose_login({display: "none"});
        setShow_profile({display: "block"});
    }
    const handleUser = (user) => {
        user ? setProfU(user) : setProfU({});
    }
    props.toProfileUser(profU);
    return(
        <>
        <div className={style.header_container}>
            <Link to="/">
                <div className={style.block_logo}>
                    <img src={logo} alt="logo_game_store" />
                    <div>
                        GAME
                        <div>STORE</div>
                    </div>
                </div>
            </Link>
            <div className={style.right_container}>
                <nav className={style.nav_container}>
                   {props.nav.map((nav, index) => <Nav key={index} nav={nav} />
                   )} 
                </nav>
                <div className={style.basket_container}>
                    <button className={style.notification}>
                        <img src={notification_icon} alt="notification_icon" />
                    </button>
                    <Link to="/basket" className={style.basket} >
                        <img src={basket_icon} alt="notification_icon" /><span>{countproducts}</span>
                    </Link>
                    <div className={style.login} style={close_login} onClick={handleShowLogin}>
                        Login
                    </div>
                    <div className={style.profile} style={show_profile}>
                        <Link to="/Profile">
                            Profile
                        </Link>
                    </div>
                </div>
            </div>
            <LoginIn show_popup = {show_popup} closeLoginIn={closeLoginIn} handleUser={handleUser} />
        </div>
        
        </>
    )
}