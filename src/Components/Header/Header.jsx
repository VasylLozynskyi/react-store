import React from "react";
import style from "./header.module.scss"
import logo from "../../assets/images/Logo.png"
import notification_icon from "../../assets/images/notification.png"
import basket_icon from "../../assets/images/basket.png"
import {Link} from "react-router-dom";
import { useState } from "react";

export const Header = (props) => {

    const [login, setLogin] = useState("");
    const [error_login_input, setError_login_input] = useState({});
    const [login_err, setLogin_err] = useState("");
    const [password, setPassword] = useState("");
    const [error_password_input, setError_password_input] = useState({});
    const [password_err, setPassword_err] = useState("");
    const [show_popup, setShowPopup] = useState({display: "none"});

    const handleShowLogin = () => {
        setShowPopup({display: "block"})
    }
    const handleCloseLogin = (e) => {
        if (e.target.attributes.closepopup.value === "true"){
            setShowPopup({display: "none"})
        } else setShowPopup({display: "block"})
    }
    const handleClosePopupBtn = () => {
        setShowPopup({display: "none"})
    }
    const handleChangeLogin = (e) => {
        setLogin(e.target.value ? e.target.value : "" )
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value ? e.target.value : "")
    }
    const handleSubmit = (e) =>{
        if (!login){
            setError_login_input({border: "1px solid red"})
            setLogin_err("Login field cannot be empty")
        } else if(login.length < 4){
            setError_login_input({border: "1px solid red"})
            setLogin_err("Login field cannot be less 4 chars")
            } else {
                setError_login_input({})
                setLogin_err("") 
            }

         if(!password) {
            setError_password_input({border: "1px solid red"})
            setPassword_err("Password field cannot be empty")
         }else if (password.length < 6){
            setError_password_input({border: "1px solid red"})
            setPassword_err("Password field cannot be less 6 chars")
          } else if (password.length > 15){
            setError_password_input({border: "1px solid red"})
            setPassword_err("Password field cannot be more then 15 chars")
          } else {
            setError_password_input({})
            setPassword_err("")
          }
          //back-end part
          if (login && password && !password_err && !login_err){
            console.log("Post to server login and password for Get true user");
          }
          //
          e.preventDefault();
    }
    const handleForgotPassword = () => {
        console.log("forgot password");
       }
    const handleSignUp = () => {
        console.log("go to popup_signup");
    }
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
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contacts">Contacts</Link>
                </nav>
                <div className={style.basket_conrainer}>
                    <button className={style.notification}>
                        <img src={notification_icon} alt="notification_icon" />
                    </button>
                    <button className={style.basket}>
                        <img src={basket_icon} alt="notification_icon" />
                    </button>
                    <div className={style.login} onClick={handleShowLogin}>
                        Login
                    </div>
                </div>
            </div>
        </div>
        <div className={style.popup_container} style={show_popup} onClick={handleCloseLogin} closepopup={"true"}>
                <div className={style.popup} closepopup={"false"}>
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="login" className={style.label}>Login (email)</label>
                            <input type="text"  id="login" name="login" placeholder="login (email)" 
                            onChange={handleChangeLogin} className={style.login_input} style={error_login_input} />
                            <div className={style.invalid_feedback}>{login_err}</div>
                        <label htmlFor="password">Password</label>
                            <input type="text"  id="password" name="password" placeholder="Password" 
                            onChange={handleChangePassword} className={style.password_input} style={error_password_input} />
                            <div className={style.invalid_feedback}>{password_err}</div>
                        <button type="submit" id="submit" className={style.btn_submit}>Sign in</button>
                        <div>
                            <div className={style.forgot_pass} onClick={handleForgotPassword}>
                           Forgot password?</div>
                        </div>
                        
                        <div className={style.signup_container} onClick= {handleSignUp}>
                            <p>Sign Up</p>
                        </div>
                    </form>
                    <button className={style.btn_closepopup} onClick={handleClosePopupBtn}>X</button>
                </div>
            </div>
        </>
    )
}