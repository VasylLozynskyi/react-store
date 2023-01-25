import React, { useEffect, useState } from "react";
import style from "./header.module.scss"
import { auth } from "../utils/firebase";
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { useNavigate } from "react-router-dom";

export const LoginUp = (props) => {
    useEffect(() => {
        setShowSignUp(props.show_signUp)
    }, [props.show_signUp])
    const [show_signUp, setShowSignUp] = useState({display: "none"});
    const [login, setLogin] = useState("");
    const [login_err, setLogin_err] = useState("");
    const [password, setPassword] = useState("");
    const [password_err, setPassword_err] = useState("");
    const [error_login_input, setError_login_input] = useState({});
    const [error_password_input, setError_password_input] = useState({});
    const navigate = useNavigate();
    const handleCloseSignUp = (e) => {
        if (e.target.attributes.closepopup.value === "true"){
            setShowSignUp({display: "none"})
        } else setShowSignUp({display: "block"})
    }
    const handleClosePopupBtn = () => {
        setShowSignUp({display: "none"})
    }
    const handleCreateLogin = (e) => {
        setLogin(e.target.value ? e.target.value : "" )
    }
    const handleCreatePassword = (e) => {
        setPassword(e.target.value ? e.target.value : "")
    }
    const handleCreateAccount = async (e) =>{
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
            // auth.createUserWithEmailAndPassword(login, password)
            // .catch(error => console.log(error))

            await createUserWithEmailAndPassword(auth, login, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                navigate("/profile")
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // ..
            });


            // auth.signInWithEmailAndPassword(login, password).catch()
          }
          //
          e.preventDefault();
    }
    const handleLoginIn = () => {
        console.log("go to popup_signin");
        setShowSignUp({display: "none"});
        props.showPopup({display: "block"})
    }
    return (
        <div className={style.popup_container} style={show_signUp} onClick={handleCloseSignUp} closepopup={"true"}>
        <div className={style.popup} closepopup={"false"}>
        <form onSubmit={handleCreateAccount}>
                <label htmlFor="login" className={style.label}>Login (email)</label>
                    <input type="text"  id="login" name="login" placeholder="login (email)" 
                    onChange={handleCreateLogin} className={style.login_input} style={error_login_input} />
                    <div className={style.invalid_feedback}>{login_err}</div>
                <label htmlFor="password">Password</label>
                    <input type="text"  id="password" name="password" placeholder="Password" 
                    onChange={handleCreatePassword} className={style.password_input} style={error_password_input} />
                    <div className={style.invalid_feedback}>{password_err}</div>
                <button type="submit" id="submit" className={style.btn_submit}>Sign up</button>
                <div className={style.sign_container} onClick= {handleLoginIn}>
                    <p>Sign In</p>
                </div>
            </form>
            <button className={style.btn_closepopup} onClick={handleClosePopupBtn}>X</button>
        </div>
    </div>
    )
}