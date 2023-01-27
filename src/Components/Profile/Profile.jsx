import { signOut } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { updateUserProfile } from "../utils/functions";
import style from "./profile.module.scss"

export const Profile = (props) =>{
    
    const [isdata, setisdata]=useState({});
    const [inputName, setInputName]=useState("");
    useEffect(()=>{
        setisdata(props.userdata)
    }, [props.userdata])
    const navigate = useNavigate();
if (isdata.uid === undefined){
    const handleLogin =() =>{
        props.toLogin({display: "block"})
    }
return (
    <div className={style.enterlogin}>
        <h2>Please Login to your profile</h2>
        <br />
        <button onClick={handleLogin}>Login</button>
    </div>
)
} else { 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
            props.show_login_after_logout({display: "block"});
        }).catch((error) => {
        console.log(error.message);
        });
    }
    const handleChange = () => {
        console.log("change name");
        setisdata(isdata.name = inputName);
        updateUserProfile(isdata);
    }
    const handleChangeName = (e) => {
        console.log(e.target.value);
        setInputName(e.target.value);
    }
    return(
        <div className={style.profile}>
            <div className={style.infouser}>
                <h2>Hello, {props.userdata.name}</h2>
                <label htmlFor="name">Name </label>
                <input type="text" placeholder={props.userdata.name} id="name" onChange={handleChangeName} />
                <button onClick={handleChange}>change</button>
                <p>email : {props.userdata.email}</p>
            </div>
            <br />
            <div>
        		<button className={style.btn_logout} onClick={handleLogout}>
                    Logout
                </button>
        	</div>
        </div>
    )
}
}