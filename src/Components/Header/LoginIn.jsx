import React, { useState } from "react";
import { useEffect } from "react";
import style from "./header.module.scss"
import { LoginUp } from "./LoginUp";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

export const LoginIn =(props) =>{
    useEffect(() => {
        setShowPopup(props.show_popup)
    }, [props.show_popup])
    const [login, setLogin] = useState("");
    const [login_err, setLogin_err] = useState("");
    const [password, setPassword] = useState("");
    const [password_err, setPassword_err] = useState("");
    const [error_login_input, setError_login_input] = useState({});
    const [error_password_input, setError_password_input] = useState({});
    const [show_popup, setShowPopup] = useState({display: "none"});
    const [show_signUp, setShowSignUp] = useState({display: "none"});
    const navigate = useNavigate();

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
        e.preventDefault();
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
            signInWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/Profile")
                setShowPopup({display: "none"})
                props.closeLoginIn({display: "none"});
                props.handleUser(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
          }
          //
    }
    const handleForgotPassword = () => {
        console.log("forgot password");
       }
    const handleSignUp = () => {
        setShowSignUp({display: "block"});
        setShowPopup({display: "none"})
    }
    const getShowPopup = (shown) =>{
        setShowPopup(shown)
    }
    const userProfile =(user) => {
        props.handleUser(user);
    }
    const closeLogin = (login) =>{
        props.closeLoginIn(login);
    }
    return (
        <>
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
                        
                        <div className={style.sign_container} onClick= {handleSignUp}>
                            <p>Sign Up</p>
                        </div>
                    </form>
                    <button className={style.btn_closepopup} onClick={handleClosePopupBtn}>X</button>
                </div>
            </div>
            <LoginUp show_signUp={show_signUp} showPopup={getShowPopup} userProfile={userProfile} closeLoginIn={closeLogin} />
        </>
    )
}